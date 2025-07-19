# n8n Automation Suite

This project demonstrates advanced automation capabilities with n8n, including Go High Level (GHL) integration and Voice AI functionality.

## Features

- **Lead Management Workflow**
  - Webhook-based lead capture
  - Multi-channel follow-up (SMS, Email, Voice)
  - Go High Level contact synchronization
  - Voice AI integration with Twilio and Voiceflow

- **Voice AI Integration**
  - Interactive voice response system
  - Call status tracking
  - GHL contact updates based on call outcomes

- **GHL Contact Sync**
  - Batch contact retrieval
  - Database storage (PostgreSQL)
  - CSV export functionality
  - Slack notifications

## Setup

### Prerequisites

- Docker and Docker Compose
- n8n.cloud account (for cloud hosting)
- Accounts with:
  - Go High Level
  - Twilio
  - Voiceflow
  - Slack (optional)

### Installation

1. Clone the repository:
   
   `git clone https://github.com/ArapKBett/N8n1
   cd N8n1`

   configure environment variables

`cp .env.example .env
nano .env  # Edit with your credentials`


   start the service 
   `docker-compose up -d`

   Open `http://localhost:5678` in your browser
   - Login with the credentials from your `.env` file


**Import Workflows**:
   - Go to "Workflows" > "Import from File"
   - Select all JSON files from the `workflows` directory
   - Activate the workflows

### Free Online Hosting (using n8n.cloud)

1. **Sign up** for a free account at [n8n.cloud](https://www.n8n.cloud)

2. **Create a new n8n instance**

3. **Configure credentials**:
   - Go to "Credentials"
   - Add all required credentials (GoHighLevel, Twilio, Voiceflow)

4. **Import workflows**:
   - Go to "Workflows" > "Import from File"
   - Select all JSON files from the `workflows` directory
   - Activate the workflows

5. **Set up webhooks**:
   - Note the public URL provided by n8n.cloud
   - Configure your lead capture forms to send data to this webhook

   
## Key Notes:

1. **requirements.txt** is included for any Python-based custom scripts you might add to extend functionality.

2. The **Voice AI Integration** workflow:
   - Handles call initiation and status callbacks
   - Updates GHL contact records with call outcomes
   - Supports interactive voice responses

3. The **GHL Contacts** workflow:
   - Syncs contacts from Go High Level
   - Stores them in PostgreSQL
   - Creates CSV backups
   - Sends Slack notifications

4. All workflows include:
   - Proper error handling
   - Data validation
   - Comprehensive documentation
   - Clear connection paths
