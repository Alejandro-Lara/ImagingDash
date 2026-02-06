from datetime import datetime
from pydantic import BaseModel, Field
from typing import Annotated, Optional
from enum import Enum

class ScanType(str, Enum):
    CT = "CT"
    MRI = "MRI"

class Region(str, Enum):
    NASALCAVITY = "nasal_cavity"
    TOES = "toes"

class PredictedCondition(str, Enum):
    A = "Condition_A"
    B = "Condition_B"

#for classes that are meant to be stored on the database
class Base(BaseModel):
    id: int

class Prediction(BaseModel):
    scan_id: str
    condition: PredictedCondition
    result: bool

class Scan(Base):
    scan_id: str
    patient_age: int
    scan_type: ScanType
    region : Region
    confidence_score: Annotated[float, Field(ge=0, le=1)]
    predicted_condition: PredictedCondition
    created_at: datetime

class ScanCreateDto(BaseModel):
    scan_id: str
    patient_age: int
    scan_type: ScanType
    region: Region
    confidence_score: Annotated[float, Field(ge=0, le=1)]
    predicted_condition: PredictedCondition
    created_at: Optional[datetime] = None #optional for testing purposes

class ScanSearchDto(BaseModel):
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=100)
    scan_id: Optional[str] = None
    scan_type: Optional[ScanType] = None
    region: Optional[Region] = None
    predicted_condition: Optional[PredictedCondition] = None
    min_confidence: Optional[float] = Field(None, ge=0, le=1)
    max_confidence: Optional[float] = Field(None, ge=0, le=1)
    created_from: Optional[datetime] = None 
    created_to: Optional[datetime] = None    

class PagedResponse(BaseModel):
    items: list[Scan]
    total: int          # total matching rows (without paging)
    page: int
    page_size: int