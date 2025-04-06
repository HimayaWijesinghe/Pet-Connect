import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create Lost Pet - Improved
export const createLostPet = async (petData) => {
  try {
    // Handle image conversion if needed
    let imageData = petData.image;
    
    // Handle blob URLs by fetching and converting to base64
    if (typeof petData.image === 'string' && petData.image.startsWith('blob:')) {
      try {
        const response = await fetch(petData.image);
        const blob = await response.blob();
        imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Image conversion error:', error);
        imageData = ''; // Fallback to empty string
      }
    }
    
    // Ensure all fields are present with proper defaults
    const completeData = {
      name: petData.name || '',
      type: petData.type || '',
      location: petData.location || '',
      age: petData.age || 0,
      color: petData.color || '',
      breed: petData.breed || '',
      story: petData.story || '', //story if story not provided
      gender: petData.gender || '',
      image: imageData || '',
      email: petData.email,
      likes: 0,
      
    };

    console.log('Sending pet data to API:', completeData);

    const response = await axios.post(`${API_BASE_URL}/create-lostpet`, completeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Lost pet created:', response.data); 
    window.location.reload(); // Reload the page to reflect changes
    return response.data;
    
  } catch (error) {
    console.error('Error creating lost pet:', error);
    throw error;
  }
};

// Update Lost Pet - Improved
export const updateLostPet = async (petId, updatedData) => {
  try {
    // Handle image conversion if needed
    let imageData = updatedData.image;
    
    // Handle blob URLs by fetching and converting to base64
    if (typeof updatedData.image === 'string' && updatedData.image.startsWith('blob:')) {
      try {
        const response = await fetch(updatedData.image);
        const blob = await response.blob();
        imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Image conversion error:', error);
        // If conversion fails, keep original image
        imageData = updatedData.image;
      }
    }
    
    // Prepare update data
    const completeUpdateData = {
      ...updatedData,
      image: imageData,
      story: updatedData.story
    };
    
    // Use the correct ID field - Add pId field for API compatibility
    const id = petId || updatedData.id || updatedData._id || updatedData.pId;
    
    if (!id) {
      throw new Error('Pet ID is required for update');
    }
    
    // Include the pId in the data payload
    completeUpdateData.pId = id;
    
    console.log(`Updating pet with ID: ${id}`, completeUpdateData);
    
    // Make the API call
    const response = await axios.put(`${API_BASE_URL}/update-lostpet/${id}`, completeUpdateData);
    console.log('Pet updated successfully:', response.data);
    window.location.reload(); // Reload the page to reflect changes
    return response.data;
  } catch (error) {
    console.error('Error updating lost pet:', error);
    throw error;
  }
};

// Delete Lost Pet - Improved
export const deleteLostPet = async (petId) => {
  console.log('Deleting lost pet with ID:', petId);
  try {
    if (!petId) {
      throw new Error('Pet ID is required for deletion');
    }
    
    console.log(`Deleting pet with ID: ${petId}`);
    
    const response = await axios.delete(`${API_BASE_URL}/delete-lostpet/${petId}`);
    console.log('Pet deleted successfully:', response.data);
    console.log(response.data.email);
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error('Error deleting lost pet:', error);
    throw error;
  }
};

// Get Pets by Email - Improved
export const getPetsByEmail = async (email) => {
  try {
    if (!email) {
      throw new Error('Email is required to fetch pets');
    }
    
    console.log(`Fetching pets for email: ${email}`);
    
    const response = await axios.get(`${API_BASE_URL}/selected-email-lostpet/${encodeURIComponent(email)}`);
    
    // Standardize response format
    let petsData = response.data;
    if (typeof petsData !== 'object') {
      console.warn('Unexpected response format from API');
      return { lostPets: [] };
    }
    
    // Handle different response structures
    if (Array.isArray(petsData)) {
      return { lostPets: petsData };
    } else if (petsData.lostPets) {
      return petsData;
    } else if (petsData.pets) {
      return { lostPets: petsData.pets };
    } else {
      console.warn('Unrecognized response structure, returning empty array');
      return { lostPets: [] };
    }
  } catch (error) {
    console.error('Error fetching lost pets by email:', error);
    throw error;
  }
};

// Remaining functions unchanged...
export const getAllLostPets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all-lostpets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lost pets:', error);
    throw error;
  }
};

export const incrementLikes = async (petId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/increment-likes/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: "increment" })
    });

    if (!response.ok) {
      throw new Error('Failed to increment likes');
    }

    return response.json();
  } catch (error) {
    console.error('❌ Like increment error:', error);
    throw error;
  }
};

export const getAllComments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all-comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-comment`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const fetchPetDetails = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-Suggested-FoundPets/${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return;
    }
    console.error('Failed to fetch pet details:', error);
    throw error;
  }
};