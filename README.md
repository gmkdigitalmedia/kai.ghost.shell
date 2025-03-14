# KAI.ghost.shell - Pathology Report Workflow Automation Demo

A technology demonstration for Antler Tokyo showcasing KAI.ghost.shell's ability to automate hospital workflows triggered by pathology reports.

## Overview

This demo automates the following workflow:
1. Process pathology reports detecting cancer
2. Notify staff via Slack
3. Log actions in Notion
4. Reschedule patient appointments
5. Send confirmation emails
6. Display workflow status on dashboard

## Key Integrations

- **Slack**: Notifies hospital staff about critical pathology results
- **Notion**: Logs all actions and provides an auditable trail
- **Google Workspace**: Sends patient emails via Gmail API
- **Hospital API**: Mock scheduling system (ready for real API integration)

## Architecture

```
kai-ghost-shell/
├── /backend/
│   ├── /data_source/        # Mock pathology report generator
│   ├── /integrations/       # API integrations
│   │   ├── /slack/          # Slack messaging
│   │   ├── /notion/         # Notion database logging
│   │   ├── /google_workspace/ # Email sending
│   │   └── /hospital/       # Mock hospital scheduling
│   ├── /orchestrator/       # Workflow orchestration
│   ├── /core/               # Core utilities
│   ├── /tests/              # Test suite
│   └── requirements.txt     # Python dependencies
├── /frontend/               # Dashboard UI
│   ├── /src/
│   │   ├── /pages/          # React components
│   │   └── App.js           # Main application
│   └── package.json         # JS dependencies
├── /deploy/                 # Deployment scripts
├── docker-compose.yml       # Container configuration
└── README.md                # Project documentation
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- Docker & Docker Compose

### API Setup

1. **Slack**:
   - Create a Slack app in your workspace
   - Add the `chat:write` scope
   - Install to the "scheduling" channel
   - Copy the Bot User OAuth Token (`xoxb-...`)

2. **Notion**:
   - Create a Notion database with columns:
     - "Patient ID" (Title)
     - "Status" (Text)
     - "Slack Message" (Text)
     - "Timestamp" (Date)
   - Create a Notion integration
   - Share the database with the integration
   - Copy the integration token and database ID

3. **Google Workspace**:
   - Set up a project in Google Cloud Console
   - Enable the Gmail API
   - Create OAuth 2.0 credentials
   - Get a token and refresh token with `https://www.googleapis.com/auth/gmail.send` scope

### Configuration

Set environment variables or create a `.env` file:

```
SLACK_TOKEN=your-slack-token
NOTION_TOKEN=your-notion-token
NOTION_DATABASE_ID=your-notion-database-id
GOOGLE_TOKEN=your-google-token
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

### Running the Demo

1. Install dependencies:
   ```
   # Backend
   cd backend
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
   ```

2. Start the application:
   ```
   docker-compose up
   ```

3. Access the dashboard at `http://localhost:3000`

## Demo Flow

1. Trigger a mock pathology report for a patient
2. Watch as the system:
   - Posts a notification to Slack
   - Logs the action in Notion
   - Reschedules the appointment via the mock hospital API
   - Sends a confirmation email
   - Updates the dashboard status

## Development

- Run backend tests: `cd backend && pytest`
- Run frontend tests: `cd frontend && npm test`

## License

Proprietary - Copyright © 2025 KAI.ghost.shell 