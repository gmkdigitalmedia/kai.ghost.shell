import os
import logging
import datetime
from typing import Dict, Any, Optional, List
from notion_client import Client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NotionClient:
    """
    Client for interacting with the Notion API.
    """
    
    def __init__(self, token: Optional[str] = None, database_id: Optional[str] = None):
        """
        Initialize the Notion client.
        
        Args:
            token (Optional[str]): Notion API token. If not provided, it will be read from the NOTION_TOKEN environment variable.
            database_id (Optional[str]): Notion database ID. If not provided, it will be read from the NOTION_DATABASE_ID environment variable.
        """
        self.token = token or os.environ.get('NOTION_TOKEN')
        if not self.token:
            raise ValueError("Notion token is required. Set the NOTION_TOKEN environment variable or pass it to the constructor.")
        
        self.database_id = database_id or os.environ.get('NOTION_DATABASE_ID')
        if not self.database_id:
            raise ValueError("Notion database ID is required. Set the NOTION_DATABASE_ID environment variable or pass it to the constructor.")
        
        self.client = Client(auth=self.token)
        logger.info("Notion client initialized")
    
    def create_page(self, properties: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new page in the Notion database.
        
        Args:
            properties (Dict[str, Any]): The properties for the new page
            
        Returns:
            Dict[str, Any]: The response from the Notion API
        """
        try:
            # Create the page
            response = self.client.pages.create(
                parent={"database_id": self.database_id},
                properties=properties
            )
            
            logger.info(f"Page created in Notion database {self.database_id}")
            return {
                "success": True,
                "page_id": response["id"],
                "database_id": self.database_id,
                "timestamp": datetime.datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error creating page in Notion: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "database_id": self.database_id
            }
    
    def format_pathology_properties(self, report: Dict[str, Any], slack_message_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Format a pathology report as Notion page properties.
        
        Args:
            report (Dict[str, Any]): The pathology report data
            slack_message_id (Optional[str]): The ID of the Slack message, if available
            
        Returns:
            Dict[str, Any]: Formatted properties for a Notion page
        """
        patient_id = report.get('patient_id', 'Unknown')
        status = report.get('status', 'Unknown')
        timestamp = report.get('timestamp', datetime.datetime.now().isoformat())
        
        # Format the timestamp for Notion
        try:
            date_str = timestamp.split('T')[0]  # Extract the date part (YYYY-MM-DD)
        except (AttributeError, IndexError):
            date_str = datetime.datetime.now().strftime('%Y-%m-%d')
        
        # Create properties for the Notion page
        properties = {
            "Patient ID": {
                "title": [
                    {
                        "text": {
                            "content": patient_id
                        }
                    }
                ]
            },
            "Status": {
                "rich_text": [
                    {
                        "text": {
                            "content": status
                        }
                    }
                ]
            },
            "Timestamp": {
                "date": {
                    "start": date_str
                }
            }
        }
        
        # Add Slack message ID if available
        if slack_message_id:
            properties["Slack Message"] = {
                "rich_text": [
                    {
                        "text": {
                            "content": slack_message_id
                        }
                    }
                ]
            }
        
        return properties
    
    def log_pathology_report(self, report: Dict[str, Any], slack_message_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Log a pathology report in Notion.
        
        Args:
            report (Dict[str, Any]): The pathology report data
            slack_message_id (Optional[str]): The ID of the Slack message, if available
            
        Returns:
            Dict[str, Any]: The response from the Notion API
        """
        # Format the properties
        properties = self.format_pathology_properties(report, slack_message_id)
        
        # Create the page
        return self.create_page(properties)
    
    def query_database(self, filter_property: Optional[Dict[str, Any]] = None, sorts: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, Any]]:
        """
        Query the Notion database.
        
        Args:
            filter_property (Optional[Dict[str, Any]]): Filter to apply to the query
            sorts (Optional[List[Dict[str, Any]]]): Sort order for the results
            
        Returns:
            List[Dict[str, Any]]: The query results
        """
        try:
            # Build the query parameters
            query_params = {"database_id": self.database_id}
            if filter_property:
                query_params["filter"] = filter_property
            if sorts:
                query_params["sorts"] = sorts
            
            # Execute the query
            response = self.client.databases.query(**query_params)
            
            logger.info(f"Query executed on Notion database {self.database_id}")
            return response["results"]
            
        except Exception as e:
            logger.error(f"Error querying Notion database: {str(e)}")
            return [] 