import os
import base64
import logging
from typing import Dict, Any, Optional, List
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GmailClient:
    """
    Client for interacting with the Gmail API.
    """
    
    def __init__(self, token: Optional[str] = None, refresh_token: Optional[str] = None):
        """
        Initialize the Gmail client.
        
        Args:
            token (Optional[str]): Google API token. If not provided, it will be read from the GOOGLE_TOKEN environment variable.
            refresh_token (Optional[str]): Google API refresh token. If not provided, it will be read from the GOOGLE_REFRESH_TOKEN environment variable.
        """
        self.token = token or os.environ.get('GOOGLE_TOKEN')
        if not self.token:
            raise ValueError("Google token is required. Set the GOOGLE_TOKEN environment variable or pass it to the constructor.")
        
        self.refresh_token = refresh_token or os.environ.get('GOOGLE_REFRESH_TOKEN')
        if not self.refresh_token:
            raise ValueError("Google refresh token is required. Set the GOOGLE_REFRESH_TOKEN environment variable or pass it to the constructor.")
        
        # In a real implementation, this would use the actual tokens to authenticate
        # For demo purposes, we'll just log the initialization
        logger.info("Gmail client initialized")
        
        # This is a placeholder for the actual authentication
        # In a real implementation, you would use the tokens to create credentials
        # self.credentials = Credentials(
        #     token=self.token,
        #     refresh_token=self.refresh_token,
        #     token_uri="https://oauth2.googleapis.com/token",
        #     client_id=os.environ.get('GOOGLE_CLIENT_ID'),
        #     client_secret=os.environ.get('GOOGLE_CLIENT_SECRET'),
        #     scopes=["https://www.googleapis.com/auth/gmail.send"]
        # )
        # self.service = build('gmail', 'v1', credentials=self.credentials)
    
    def create_message(self, sender: str, to: str, subject: str, message_text: str, html_content: Optional[str] = None) -> Dict[str, Any]:
        """
        Create a message for an email.
        
        Args:
            sender (str): Email address of the sender
            to (str): Email address of the recipient
            subject (str): Subject of the email
            message_text (str): Plain text content of the email
            html_content (Optional[str]): HTML content of the email
            
        Returns:
            Dict[str, Any]: The email message
        """
        message = MIMEMultipart('alternative')
        message['to'] = to
        message['from'] = sender
        message['subject'] = subject
        
        # Attach plain text and HTML parts
        message.attach(MIMEText(message_text, 'plain'))
        if html_content:
            message.attach(MIMEText(html_content, 'html'))
        
        # Encode the message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        
        return {'raw': encoded_message}
    
    def send_message(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """
        Send an email message.
        
        Args:
            message (Dict[str, Any]): The email message to send
            
        Returns:
            Dict[str, Any]: The response from the Gmail API
        """
        try:
            # In a real implementation, this would use the Gmail API
            # sent_message = self.service.users().messages().send(userId='me', body=message).execute()
            
            # For demo purposes, we'll just log the message
            logger.info(f"Email sent: {message}")
            
            # Mock successful result
            return {
                "success": True,
                "email_id": f"email-{hash(str(message))}",
                "timestamp": "2025-03-14T10:30:00Z"
            }
            
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def format_appointment_email(self, patient_id: str, appointment_details: Dict[str, Any]) -> Dict[str, str]:
        """
        Format an email for a rescheduled appointment.
        
        Args:
            patient_id (str): The patient ID
            appointment_details (Dict[str, Any]): Details of the appointment
            
        Returns:
            Dict[str, str]: The formatted email content
        """
        # Extract appointment details
        previous_date = appointment_details.get('previous_date', 'Unknown')
        new_date = appointment_details.get('new_date', 'Unknown')
        doctor = appointment_details.get('doctor', 'Unknown')
        department = appointment_details.get('department', 'Unknown')
        
        # Format the plain text email
        text_content = f"""
Dear Patient {patient_id},

Your appointment has been rescheduled due to urgent medical considerations.

Previous Appointment: {previous_date}
New Appointment: {new_date}
Doctor: {doctor}
Department: {department}

Please contact the hospital if you have any questions or concerns.

Best regards,
Tokyo General Hospital
"""
        
        # Format the HTML email
        html_content = f"""
<html>
<head></head>
<body>
  <p>Dear Patient {patient_id},</p>
  
  <p>Your appointment has been rescheduled due to urgent medical considerations.</p>
  
  <table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
    <tr style="background-color: #f2f2f2;">
      <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Previous Appointment</th>
      <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">{previous_date}</td>
    </tr>
    <tr>
      <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">New Appointment</th>
      <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">{new_date}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Doctor</th>
      <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">{doctor}</td>
    </tr>
    <tr>
      <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Department</th>
      <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">{department}</td>
    </tr>
  </table>
  
  <p>Please contact the hospital if you have any questions or concerns.</p>
  
  <p>Best regards,<br>
  Tokyo General Hospital</p>
</body>
</html>
"""
        
        return {
            "text": text_content,
            "html": html_content
        }
    
    def send_appointment_email(self, patient_id: str, appointment_details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Send an email about a rescheduled appointment.
        
        Args:
            patient_id (str): The patient ID
            appointment_details (Dict[str, Any]): Details of the appointment
            
        Returns:
            Dict[str, Any]: The response from the Gmail API
        """
        # Generate a mock email address for the patient
        to_email = f"patient-{patient_id}@example.com"
        
        # Format the email content
        email_content = self.format_appointment_email(patient_id, appointment_details)
        
        # Create the message
        message = self.create_message(
            sender="appointments@tokyogeneral.example.com",
            to=to_email,
            subject="Important: Your Appointment Has Been Rescheduled",
            message_text=email_content["text"],
            html_content=email_content["html"]
        )
        
        # Send the message
        result = self.send_message(message)
        
        # Add recipient information to the result
        result["recipient"] = to_email
        result["subject"] = "Important: Your Appointment Has Been Rescheduled"
        
        return result 