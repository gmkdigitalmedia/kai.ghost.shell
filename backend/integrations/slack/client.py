import os
import logging
from typing import Dict, Any, Optional
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SlackClient:
    """
    Client for interacting with the Slack API.
    """
    
    def __init__(self, token: Optional[str] = None):
        """
        Initialize the Slack client.
        
        Args:
            token (Optional[str]): Slack API token. If not provided, it will be read from the SLACK_TOKEN environment variable.
        """
        self.token = token or os.environ.get('SLACK_TOKEN')
        if not self.token:
            raise ValueError("Slack token is required. Set the SLACK_TOKEN environment variable or pass it to the constructor.")
        
        self.client = WebClient(token=self.token)
        logger.info("Slack client initialized")
    
    def send_message(self, channel: str, text: str, blocks: Optional[list] = None) -> Dict[str, Any]:
        """
        Send a message to a Slack channel.
        
        Args:
            channel (str): The channel to send the message to (e.g., "#scheduling")
            text (str): The message text
            blocks (Optional[list]): Optional blocks for rich formatting
            
        Returns:
            Dict[str, Any]: The response from the Slack API
        """
        try:
            # Send the message
            response = self.client.chat_postMessage(
                channel=channel,
                text=text,
                blocks=blocks
            )
            
            logger.info(f"Message sent to Slack channel {channel}")
            return {
                "success": True,
                "message_id": response['ts'],
                "channel": channel,
                "timestamp": response['ts']
            }
            
        except SlackApiError as e:
            logger.error(f"Error sending message to Slack: {e.response['error']}")
            return {
                "success": False,
                "error": e.response['error'],
                "channel": channel
            }
    
    def format_pathology_notification(self, report: Dict[str, Any]) -> list:
        """
        Format a pathology report as a rich Slack message.
        
        Args:
            report (Dict[str, Any]): The pathology report data
            
        Returns:
            list: Formatted blocks for a Slack message
        """
        patient_id = report.get('patient_id', 'Unknown')
        status = report.get('status', 'Unknown')
        severity = report.get('severity', 'Unknown')
        doctor = report.get('doctor', 'Unknown')
        hospital = report.get('hospital', 'Unknown')
        
        # Create blocks for a rich message
        blocks = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f"🚨 Critical Pathology Result: {status}"
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"*Patient ID:*\n{patient_id}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Severity:*\n{severity}"
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"*Doctor:*\n{doctor}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*Hospital:*\n{hospital}"
                    }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*Description:*\n{report.get('findings', {}).get('description', 'No description available')}"
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "View Patient Record"
                        },
                        "value": f"view_patient_{patient_id}",
                        "action_id": "view_patient"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "View Workflow Status"
                        },
                        "value": f"view_workflow_{patient_id}",
                        "action_id": "view_workflow"
                    }
                ]
            }
        ]
        
        return blocks
    
    def notify_pathology_result(self, report: Dict[str, Any], channel: str = "#scheduling") -> Dict[str, Any]:
        """
        Send a notification about a pathology result to Slack.
        
        Args:
            report (Dict[str, Any]): The pathology report data
            channel (str): The channel to send the notification to
            
        Returns:
            Dict[str, Any]: The response from the Slack API
        """
        patient_id = report.get('patient_id', 'Unknown')
        status = report.get('status', 'Unknown')
        
        # Create a simple text message
        text = f"Critical Pathology Result: Patient {patient_id} - {status}"
        
        # Create rich formatting blocks
        blocks = self.format_pathology_notification(report)
        
        # Send the message
        return self.send_message(channel, text, blocks) 