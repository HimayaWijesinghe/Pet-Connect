

import PetSymptomModel from './PetSymptomModel';

class PetSymptomApiService {
  constructor() {
    this.model = new PetSymptomModel();
    this.pendingRequests = {};
  }

  /**
   * Get all available symptoms
   * @returns {Promise} Promise resolving to symptoms array
   */
  async getSymptoms() {
    try {
      // Use debounce cache to prevent multiple identical calls
      if (this.pendingRequests.symptoms) {
        return this.pendingRequests.symptoms;
      }

      this.pendingRequests.symptoms = new Promise((resolve) => {
        // Simulate API latency for a more realistic experience
        setTimeout(() => {
          const symptoms = this.model.getAllSymptoms();
          resolve({
            success: true,
            data: symptoms
          });
          delete this.pendingRequests.symptoms;
        }, 300);
      });

      return this.pendingRequests.symptoms;
    } catch (error) {
      console.error("Error fetching symptoms:", error);
      return {
        success: false,
        error: "Failed to fetch symptoms. Please try again."
      };
    }
  }

  /**
   * Get first aid information for a specific symptom
   * @param {string} symptom - The symptom to get first aid info for
   * @returns {Promise} Promise resolving to first aid information
   */
  async getFirstAidInfo(symptom) {
    try {
      if (!symptom) {
        return {
          success: false,
          error: "Please select a valid symptom"
        };
      }

      const cacheKey = `firstAid_${symptom}`;
      
      if (this.pendingRequests[cacheKey]) {
        return this.pendingRequests[cacheKey];
      }

      this.pendingRequests[cacheKey] = new Promise((resolve) => {
        setTimeout(() => {
          const firstAidInfo = this.model.getFirstAidInfo(symptom);
          resolve({
            success: true,
            data: firstAidInfo
          });
          delete this.pendingRequests[cacheKey];
        }, 300);
      });

      return this.pendingRequests[cacheKey];
    } catch (error) {
      console.error("Error fetching first aid info:", error);
      return {
        success: false,
        error: "Failed to fetch first aid information. Please try again."
      };
    }
  }

  /**
   * Get personalized recommendation based on pet information
   * @param {Object} petInfo - Information about the pet
   * @returns {Promise} Promise resolving to personalized recommendation
   */
  async getRecommendation(petInfo) {
    try {
      // Validate required fields
      const requiredFields = ['petType', 'sex', 'age', 'isSpayed', 'mainSymptom'];
      const missingFields = requiredFields.filter(field => !petInfo[field] && petInfo[field] !== false);
      
      if (missingFields.length > 0) {
        return {
          success: false,
          error: `Missing required information: ${missingFields.join(', ')}`
        };
      }

      return new Promise((resolve) => {
        // Add slight delay to improve user experience
        setTimeout(() => {
          const recommendation = this.model.getRecommendation(petInfo);
          resolve({
            success: true,
            data: recommendation
          });
        }, 800);
      });
    } catch (error) {
      console.error("Error generating recommendation:", error);
      return {
        success: false,
        error: "Failed to generate recommendation. Please check your inputs and try again."
      };
    }
  }

  /**
   * Save session data for sharing/retrieval
   * @param {Object} sessionData - Complete session data to save
   * @returns {Promise} Promise resolving with session ID
   */
  async saveSession(sessionData) {
    try {
      // Validate session data
      if (!sessionData.petType || !sessionData.sex || 
          !sessionData.age || sessionData.isSpayed === null || 
          !sessionData.mainSymptom) {
        return {
          success: false,
          error: "Incomplete session data. Please fill all required fields."
        };
      }

      // Track analytics event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'save_pet_session',
          petType: sessionData.petType
        });
      }

      return this.model.saveSession(sessionData);
    } catch (error) {
      console.error("Error saving session:", error);
      return {
        success: false,
        error: "Failed to save session data. Please try again."
      };
    }
  }

  /**
   * Retrieve a previously saved session
   * @param {string} sessionId - The unique session identifier
   * @returns {Promise} Promise resolving with session data
   */
  async getSession(sessionId) {
    try {
      if (!sessionId || typeof sessionId !== 'string') {
        return {
          success: false,
          error: "Invalid session ID"
        };
      }

      return this.model.getSession(sessionId);
    } catch (error) {
      console.error("Error fetching session:", error);
      return {
        success: false,
        error: "Failed to retrieve session data. The link may be invalid or expired."
      };
    }
  }
  
  /**
   * Get possible causes for a specific symptom
   * @param {string} symptom - The symptom to get causes for
   * @returns {Promise} Promise resolving to array of possible causes
   */
  async getPossibleCauses(symptom) {
    try {
      if (!symptom) {
        return {
          success: false,
          error: "Please select a valid symptom"
        };
      }
      
      const causes = this.model.getPossibleCauses(symptom);
      return {
        success: true,
        data: causes
      };
    } catch (error) {
      console.error("Error fetching possible causes:", error);
      return {
        success: false,
        error: "Failed to fetch possible causes. Please try again."
      };
    }
  }
  
  // Add these functions to your existing PetSymptomModel class

/**
 * Log email activity for analytics
 * @param {string} emailAddress - The email address the report was sent to
 * @param {string} sessionId - The session ID associated with the report
 * @returns {Promise} Promise resolving to success status
 */
async logEmailActivity(emailAddress, sessionId) {
  try {
    // In a real implementation, you might store this in a database
    // For now, we'll just log it and return success
    
    console.log(`Email sent to ${emailAddress} for session ${sessionId}`);
    
    // Track email event for analytics if available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pet_report_email_sent',
        sessionId: sessionId
      });
    }
    
    return {
      success: true
    };
  } catch (error) {
    console.error("Error logging email activity:", error);
    return {
      success: false,
      error: "Failed to log email activity"
    };
  }
}

/**
 * Generate more detailed recommendation report
 * @param {Object} petInfo - Information about the pet
 * @returns {Object} Detailed recommendation report
 */
generateDetailedReport(petInfo) {
  const baseRecommendation = this.getRecommendation(petInfo);
  const possibleCauses = this.getPossibleCauses(petInfo.mainSymptom);
  
  // Get first aid information
  const firstAidInfo = this.getFirstAidInfo(petInfo.mainSymptom);
  
  // Add additional information based on pet type and condition
  let additionalInfo = '';
  
  // Add age-specific advice
  if (petInfo.age.includes('Puppy') || petInfo.age.includes('Kitten')) {
    additionalInfo += "\n\nYoung animals may show symptoms differently than adults. " +
                     "Their immune systems are still developing, so monitor them closely and " +
                     "contact your veterinarian if symptoms persist or worsen.";
  } else if (petInfo.age.includes('Senior')) {
    additionalInfo += "\n\nOlder pets may have multiple health conditions that can complicate " +
                     "their symptoms. Regular veterinary check-ups are especially important " +
                     "for senior pets.";
  }
  
  // Add breed-specific information if we had it (placeholder)
  // In a real app, you might have breed-specific advice
  
  // Recommendations for follow-up
  const followUpRecommendations = [
    "Keep a log of your pet's symptoms including time, duration, and severity",
    "Take photos or videos of the symptoms to show your veterinarian",
    "Monitor your pet's food and water intake",
    "Note any changes in behavior or energy levels"
  ];
  
  // Combine all information into a comprehensive report
  return {
    basicRecommendation: baseRecommendation,
    possibleCauses: possibleCauses,
    firstAidInformation: firstAidInfo,
    ageSpecificAdvice: additionalInfo,
    followUpRecommendations: followUpRecommendations,
    disclaimer: "This report is for educational purposes only and is not a substitute for professional veterinary advice."
  };
}
  /**
   * Helper method to clear all pending requests
   * Used when resetting the application state
   */
  clearPendingRequests() {
    this.pendingRequests = {};
  }
}



export default PetSymptomApiService;