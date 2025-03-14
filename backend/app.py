import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import modules
from data_source.mock_pathology import get_pathology_report
from orchestrator.workflow import PathologyWorkflow

app = Flask(__name__)
CORS(app)

@app.route('/api/status', methods=['GET'])
def status():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "KAI.ghost.shell backend is running"})

@app.route('/api/pathology/report/<patient_id>', methods=['GET'])
def get_report(patient_id):
    """Get pathology report for a patient"""
    report = get_pathology_report(patient_id)
    return jsonify(report)

@app.route('/api/workflow/trigger', methods=['POST'])
def trigger_workflow():
    """Trigger the pathology workflow"""
    data = request.json
    patient_id = data.get('patient_id')
    
    if not patient_id:
        return jsonify({"error": "Patient ID is required"}), 400
    
    # Get the pathology report
    report = get_pathology_report(patient_id)
    
    # Initialize and run the workflow
    workflow = PathologyWorkflow(report)
    result = workflow.run()
    
    return jsonify(result)

@app.route('/api/workflow/status', methods=['GET'])
def workflow_status():
    """Get the status of all workflows"""
    # In a real implementation, this would fetch from a database
    mock_statuses = [
        {
            "patient_id": "P12345",
            "status": "completed",
            "steps": [
                {"name": "slack_notification", "status": "completed", "timestamp": "2025-03-14T09:15:00Z"},
                {"name": "notion_logging", "status": "completed", "timestamp": "2025-03-14T09:15:05Z"},
                {"name": "appointment_rescheduling", "status": "completed", "timestamp": "2025-03-14T09:15:10Z"},
                {"name": "email_notification", "status": "completed", "timestamp": "2025-03-14T09:15:15Z"}
            ],
            "timestamp": "2025-03-14T09:15:00Z"
        }
    ]
    return jsonify(mock_statuses)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 