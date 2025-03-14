#!/bin/bash

# KAI.ghost.shell Deployment Script
# This script deploys the Pathology Report Workflow Automation Demo

echo "Starting KAI.ghost.shell deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found. Please create it with the required API keys."
    echo "Required environment variables:"
    echo "  SLACK_TOKEN"
    echo "  NOTION_TOKEN"
    echo "  NOTION_DATABASE_ID"
    echo "  GOOGLE_TOKEN"
    echo "  GOOGLE_REFRESH_TOKEN"
    exit 1
fi

# Build and start the containers
echo "Building and starting containers..."
docker-compose down
docker-compose build
docker-compose up -d

echo "Deployment completed successfully!"
echo "Access the application at http://localhost:3000" 