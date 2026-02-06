
enum ScanType{
    CT = "CT",
    MRI = "MRI"
}

enum Region{
    NASALCAVITY = "nasal_cavity",
    TOES = "toes"
}

enum PredictedCondition{
    A = "Condition_A",
    B = "Condition_B"
}

interface Scan{
    id:number
    scan_id: string
    patient_age: number
    scan_type: ScanType
    region : Region
    confidence_score: number
    predicted_condition: PredictedCondition
    created_at: string
}