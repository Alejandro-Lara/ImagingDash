from datetime import datetime, timezone
import random
import string
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import PagedResponse, PredictedCondition, Prediction, Region, Scan, ScanCreateDto, ScanSearchDto, ScanType

app = FastAPI()

# Add CORS - THIS FIXES THE CORS ERROR
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scans: list[Scan] = []
next_id = 1

characters = string.ascii_letters + string.digits

for i in range(1,200):
    newScan = Scan(
        id=next_id,
        confidence_score=random.random(),
        patient_age=random.randint(0, 100),
        predicted_condition=PredictedCondition.A if random.random() >= 0.5 else PredictedCondition.B,
        region=Region.NASALCAVITY if random.random() >= 0.5 else Region.TOES,
        scan_type=ScanType.CT if random.random() >= 0.5 else ScanType.MRI,
        scan_id=''.join(random.choice(characters) for i in range(8)),
        created_at= datetime.now(timezone.utc) 
    )
    next_id+=1
    scans.append(newScan)

@app.get("/")
def root():
    return {"message": "Hello this is the landing page for the Imaging Dashboard Assessment"}

@app.get("/Predictions", response_model=list[Prediction])
def get_predictions():
    predictions = []

    for scan in scans:
        prediction = Prediction(
            scan_id=scan.scan_id,
            condition=scan.predicted_condition,
            result= True if scan.confidence_score >0.5 else False
        )

        predictions.append(prediction)

    return predictions

@app.post("/scans/create", response_model=Scan)
def create_scan(dto: ScanCreateDto):
    global next_id

    created_at = dto.created_at or datetime.now(timezone.utc)  #optional for testing purposes
    scan = Scan(
        id=next_id,
        scan_id=dto.scan_id,
        patient_age=dto.patient_age,
        scan_type=dto.scan_type,
        region=dto.region,
        confidence_score=dto.confidence_score,
        predicted_condition=dto.predicted_condition,
        created_at=created_at,
    )
    scans.append(scan)
    next_id += 1
    return scan

@app.post("/scans/search", response_model=PagedResponse)
def list_scans(
    scanSearchDto: ScanSearchDto
):
    # 1) filter
    filtered = scans

    if scanSearchDto.scan_id is not None:
        filtered = [s for s in filtered if s.scan_id == scanSearchDto.scan_id]

    if scanSearchDto.scan_type is not None:
        filtered = [s for s in filtered if s.scan_type == scanSearchDto.scan_type]

    if scanSearchDto.region is not None:
        filtered = [s for s in filtered if s.region == scanSearchDto.region]
    
    if scanSearchDto.predicted_condition is not None:
        filtered = [s for s in filtered if s.predicted_condition == scanSearchDto.predicted_condition]

    if scanSearchDto.min_confidence is not None:
        filtered = [s for s in filtered if s.confidence_score >= scanSearchDto.min_confidence]

    if scanSearchDto.max_confidence is not None:
        filtered = [s for s in filtered if s.confidence_score <= scanSearchDto.max_confidence]

    if scanSearchDto.created_from is not None:
        filtered = [s for s in filtered if s.created_at >= scanSearchDto.created_from]

    if scanSearchDto.created_to is not None:
        filtered = [s for s in filtered if s.created_at <= scanSearchDto.created_to]

    total = len(filtered)

    # 2) paging
    start = (scanSearchDto.page - 1) * scanSearchDto.page_size
    end = start + scanSearchDto.page_size
    items = filtered[start:end]

    return PagedResponse(
        items=items,
        total=total,
        page=scanSearchDto.page,
        page_size=scanSearchDto.page_size,
    )