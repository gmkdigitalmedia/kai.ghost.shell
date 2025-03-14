import logging
import datetime
from typing import Dict, Any, Optional, List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HospitalClient:
    """
    Client for interacting with the Hospital API.
    
    This is a mock implementation for the demo. In a real implementation,
    this would connect to the hospital's scheduling system.
    """
    
    def __init__(self, api_url: Optional[str] = None, api_key: Optional[str] = None):
        """
        Initialize the Hospital API client.
        
        Args:
            api_url (Optional[str]): Hospital API URL. Not used in the mock implementation.
            api_key (Optional[str]): Hospital API key. Not used in the mock implementation.
        """
        # In a real implementation, these would be used to connect to the API
        self.api_url = api_url or "https://api.hospital.example.com"
        self.api_key = api_key
        
        logger.info("Hospital API client initialized (mock implementation)")
        
        # Mock data store for appointments
        self.appointments = {}
    
    def get_patient_appointments(self, patient_id: str) -> List[Dict[str, Any]]:
        """
        Get all appointments for a patient.
        
        Args:
            patient_id (str): The patient ID
            
        Returns:
            List[Dict[str, Any]]: List of appointments
        """
        # In a real implementation, this would call the hospital API
        # For demo purposes, we'll generate a mock appointment
        
        # Generate a future date (2 weeks from now)
        future_date = datetime.datetime.now() + datetime.timedelta(days=14)
        future_date_str = future_date.strftime("%Y-%m-%dT%H:%M:%SZ")
        
        # Generate a mock appointment
        appointment = {
            "appointment_id": f"apt-{patient_id}-{datetime.datetime.now().strftime('%Y%m%d')}",
            "patient_id": patient_id,
            "date": future_date_str,
            "doctor": "Dr. Tanaka",
            "department": "General Medicine",
            "status": "scheduled"
        }
        
        # Store the appointment in our mock data store
        if patient_id not in self.appointments:
            self.appointments[patient_id] = []
        
        if not self.appointments[patient_id]:
            self.appointments[patient_id].append(appointment)
        
        logger.info(f"Retrieved appointments for patient {patient_id}")
        return self.appointments[patient_id]
    
    def reschedule_appointment(self, patient_id: str, appointment_id: Optional[str] = None, reason: str = "Urgent medical consideration") -> Dict[str, Any]:
        """
        Reschedule an appointment for a patient.
        
        Args:
            patient_id (str): The patient ID
            appointment_id (Optional[str]): The appointment ID. If not provided, the first appointment will be rescheduled.
            reason (str): The reason for rescheduling
            
        Returns:
            Dict[str, Any]: The rescheduled appointment details
        """
        # Get the patient's appointments
        appointments = self.get_patient_appointments(patient_id)
        
        if not appointments:
            logger.error(f"No appointments found for patient {patient_id}")
            return {
                "success": False,
                "error": f"No appointments found for patient {patient_id}"
            }
        
        # Find the appointment to reschedule
        appointment = None
        if appointment_id:
            for apt in appointments:
                if apt["appointment_id"] == appointment_id:
                    appointment = apt
                    break
        else:
            # If no appointment ID is provided, reschedule the first one
            appointment = appointments[0]
        
        if not appointment:
            logger.error(f"Appointment {appointment_id} not found for patient {patient_id}")
            return {
                "success": False,
                "error": f"Appointment {appointment_id} not found for patient {patient_id}"
            }
        
        # Store the previous date
        previous_date = appointment["date"]
        
        # Generate a new date (1 week from now)
        new_date = datetime.datetime.now() + datetime.timedelta(days=7)
        new_date_str = new_date.strftime("%Y-%m-%dT%H:%M:%SZ")
        
        # Update the appointment
        appointment["date"] = new_date_str
        appointment["status"] = "rescheduled"
        appointment["reason"] = reason
        appointment["updated_at"] = datetime.datetime.now().isoformat()
        
        logger.info(f"Rescheduled appointment {appointment['appointment_id']} for patient {patient_id}")
        
        # Return the result
        return {
            "success": True,
            "appointment_id": appointment["appointment_id"],
            "patient_id": patient_id,
            "previous_date": previous_date,
            "new_date": new_date_str,
            "doctor": appointment["doctor"],
            "department": appointment["department"],
            "reason": reason,
            "timestamp": datetime.datetime.now().isoformat()
        }
    
    def create_appointment(self, patient_id: str, date: str, doctor: str, department: str) -> Dict[str, Any]:
        """
        Create a new appointment for a patient.
        
        Args:
            patient_id (str): The patient ID
            date (str): The appointment date (ISO format)
            doctor (str): The doctor's name
            department (str): The department
            
        Returns:
            Dict[str, Any]: The created appointment details
        """
        # Generate a new appointment ID
        appointment_id = f"apt-{patient_id}-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Create the appointment
        appointment = {
            "appointment_id": appointment_id,
            "patient_id": patient_id,
            "date": date,
            "doctor": doctor,
            "department": department,
            "status": "scheduled",
            "created_at": datetime.datetime.now().isoformat()
        }
        
        # Store the appointment in our mock data store
        if patient_id not in self.appointments:
            self.appointments[patient_id] = []
        
        self.appointments[patient_id].append(appointment)
        
        logger.info(f"Created appointment {appointment_id} for patient {patient_id}")
        
        # Return the result
        return {
            "success": True,
            "appointment_id": appointment_id,
            "patient_id": patient_id,
            "date": date,
            "doctor": doctor,
            "department": department,
            "status": "scheduled",
            "timestamp": datetime.datetime.now().isoformat()
        }
    
    def cancel_appointment(self, patient_id: str, appointment_id: str, reason: str = "Patient request") -> Dict[str, Any]:
        """
        Cancel an appointment for a patient.
        
        Args:
            patient_id (str): The patient ID
            appointment_id (str): The appointment ID
            reason (str): The reason for cancellation
            
        Returns:
            Dict[str, Any]: The cancellation result
        """
        # Get the patient's appointments
        if patient_id not in self.appointments:
            logger.error(f"No appointments found for patient {patient_id}")
            return {
                "success": False,
                "error": f"No appointments found for patient {patient_id}"
            }
        
        # Find the appointment to cancel
        appointment = None
        for apt in self.appointments[patient_id]:
            if apt["appointment_id"] == appointment_id:
                appointment = apt
                break
        
        if not appointment:
            logger.error(f"Appointment {appointment_id} not found for patient {patient_id}")
            return {
                "success": False,
                "error": f"Appointment {appointment_id} not found for patient {patient_id}"
            }
        
        # Update the appointment status
        appointment["status"] = "cancelled"
        appointment["reason"] = reason
        appointment["cancelled_at"] = datetime.datetime.now().isoformat()
        
        logger.info(f"Cancelled appointment {appointment_id} for patient {patient_id}")
        
        # Return the result
        return {
            "success": True,
            "appointment_id": appointment_id,
            "patient_id": patient_id,
            "date": appointment["date"],
            "status": "cancelled",
            "reason": reason,
            "timestamp": datetime.datetime.now().isoformat()
        } 