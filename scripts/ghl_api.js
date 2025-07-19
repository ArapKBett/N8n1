// File: ghl_api.js
// Path: /n8n-automation-demo/scripts/ghl_api.js
// Description: Helper functions for Go High Level API interactions

class GHLClient {
  constructor(apiKey, locationId) {
    this.apiKey = apiKey;
    this.locationId = locationId;
    this.baseUrl = 'https://rest.gohighlevel.com/v1';
  }

  async createContact(contactData) {
    const url = `${this.baseUrl}/contacts/`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    const payload = {
      ...contactData,
      locationId: this.locationId
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`GHL API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating GHL contact:', error);
      throw error;
    }
  }

  async addTag(contactId, tagName) {
    const url = `${this.baseUrl}/contacts/${contactId}/tags`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    const payload = {
      tags: [tagName]
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`GHL API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding GHL tag:', error);
      throw error;
    }
  }

  async searchContacts(query) {
    const url = `${this.baseUrl}/contacts/?query=${encodeURIComponent(query)}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Version': '2021-07-28'
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`GHL API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching GHL contacts:', error);
      throw error;
    }
  }
}

module.exports = GHLClient;
