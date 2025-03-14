import datetime
import random

def get_pathology_report(patient_id):
    """
    Generate a mock pathology report for the given patient ID.
    
    Args:
        patient_id (str): The patient identifier
        
    Returns:
        dict: A mock pathology report with patient details and findings
    """
    # Ensure patient ID is consistent
    if not patient_id:
        raise ValueError("Patient ID is required")
    
    # Generate report timestamp (current time)
    timestamp = datetime.datetime.now().isoformat()
    
    # Generate mock data based on patient ID
    # In a real implementation, this would come from a database or actual pathology system
    report_types = ["Biopsy", "Blood Test", "Tissue Analysis", "Cytology"]
    statuses = ["Cancer detected", "Abnormal cells present", "Malignancy suspected", "Tumor identified"]
    doctors = ["Dr. Tanaka", "Dr. Suzuki", "Dr. Watanabe", "Dr. Sato"]
    hospitals = ["Tokyo General Hospital", "Yokohama Medical Center", "Osaka University Hospital", "Kyoto Medical Center"]
    
    # Use patient ID to seed random but keep consistent for same patient
    random.seed(patient_id)
    
    # Generate mock findings
    status = statuses[0] if "1" in patient_id else random.choice(statuses)
    severity = "High" if "1" in patient_id or "2" in patient_id else random.choice(["Low", "Medium", "High"])
    follow_up_required = severity in ["Medium", "High"]
    
    return {
        "patient_id": patient_id,
        "report_id": f"PTH-{random.randint(10000, 99999)}",
        "report_type": random.choice(report_types),
        "status": status,
        "severity": severity,
        "doctor": random.choice(doctors),
        "hospital": random.choice(hospitals),
        "timestamp": timestamp,
        "follow_up_required": follow_up_required,
        "findings": {
            "description": f"Patient {patient_id} shows signs of {status.lower()}. Further examination is advised.",
            "details": {
                "cell_abnormality": random.choice(["Detected", "Not detected"]),
                "tissue_damage": random.choice(["Minimal", "Moderate", "Severe"]),
                "tumor_markers": random.choice(["Elevated", "Normal", "Inconclusive"])
            }
        }
    }

# Test function
if __name__ == "__main__":
    test_id = "P12345"
    report = get_pathology_report(test_id)
    print(f"Generated pathology report for {test_id}:")
    import json
    print(json.dumps(report, indent=2)) 