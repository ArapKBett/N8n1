// File: voiceai_integration.js
// Path: /n8n-automation-demo/scripts/voiceai_integration.js
// Description: Voice AI integration with Twilio and Voiceflow

const Twilio = require('twilio');

class VoiceAIIntegration {
  constructor(twilioAccountSid, twilioAuthToken, voiceflowApiKey) {
    this.twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);
    this.voiceflowApiKey = voiceflowApiKey;
  }

  async initiateCall(toNumber, fromNumber, message, options = {}) {
    try {
      const response = await this.twilioClient.calls.create({
        url: this._buildVoiceflowUrl(message, options),
        to: toNumber,
        from: fromNumber,
        machineDetection: 'Enable',
        ...options
      });
      
      return response.sid;
    } catch (error) {
      console.error('Error initiating Voice AI call:', error);
      throw error;
    }
  }

  _buildVoiceflowUrl(message, options) {
    const baseUrl = 'https://general-runtime.voiceflow.com';
    const versionID = options.versionID || process.env.VOICEFLOW_VERSION_ID;
    const userID = options.userID || `user_${Math.random().toString(36).substr(2, 9)}`;
    
    const queryParams = new URLSearchParams({
      message,
      ...options
    });
    
    return `${baseUrl}/state/${versionID}/user/${userID}/interact?${queryParams.toString()}`;
  }

  async handleCallback(callbackData) {
    // Process Voiceflow callback data
    const { userID, versionID, action, input } = callbackData;
    
    // Example: Handle different Voiceflow actions
    switch (action) {
      case 'schedule_callback':
        return this._scheduleCallback(userID, input);
      case 'transfer_to_agent':
        return this._transferToAgent(userID, input);
      default:
        return this._continueConversation(userID, versionID, input);
    }
  }

  async _scheduleCallback(userID, callbackTime) {
    // Implement callback scheduling logic
    return { status: 'scheduled', callbackTime };
  }

  async _transferToAgent(userID, extension) {
    // Implement transfer logic
    return { status: 'transferred', extension };
  }

  async _continueConversation(userID, versionID, input) {
    // Continue conversation with Voiceflow
    const response = await fetch(
      `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
      {
        method: 'POST',
        headers: {
          'Authorization': this.voiceflowApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input })
      }
    );
    
    return await response.json();
  }
}

module.exports = VoiceAIIntegration;
