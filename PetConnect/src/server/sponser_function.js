import axios from 'axios';

const API_URL = 'http://localhost:3001/api/';

const fetchSponsorData = async () => {
  try {
    const response = await axios.get(`${API_URL}all-sponserdata`);
    
    // Access the nested response array
    const rawData = response.data.response || [];
    
    // Transform the data to match required format
    const transformedData = rawData.map(item => ({
      id: item.sdId?.toString() || 'unknown-id',
      name: item.name || 'Unnamed Animal',
      type: (item.type || 'other').toLowerCase(),
      age: item.age || 0,
      breed: item.breed || 'Unknown Breed',
      color: item.color || 'Unknown Color',
      image: item.image || '/placeholder.webp',
      description: item.description || 'No description available',
      date: item.sponserDataDate || new Date().toISOString(),
      status: (item.status || 'unknown').toLowerCase(),
      amount: item.amount || 0,
      gender: (item.gender || 'unknown').toLowerCase()
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching sponsor data:', error);
    throw error;
  }
};

const fetchLast6Sponsors = async () => {
  try {
    const response = await axios.get(`${API_URL}all-sponserdata`);
    
    // Access the nested response array and sort by date
    const rawData = response.data.response || [];
    
    // Sort by date descending and take first 6
    const latestData = rawData
      .sort((a, b) => new Date(b.sponserDataDate) - new Date(a.sponserDataDate))
      .slice(0, 6);

    // Transform the data
    const transformedData = latestData.map(item => ({
      id: item.sdId?.toString() || 'unknown-id',
      name: item.name || 'Unnamed Animal',
      type: (item.type || 'other').toLowerCase(),
      age: item.age || 0,
      breed: item.breed || 'Unknown Breed',
      color: item.color || 'Unknown Color',
      image: item.image || '/placeholder-animal.jpg',
      description: item.description || 'No description available',
      date: item.sponserDataDate || new Date().toISOString(),
      status: (item.status || 'unknown').toLowerCase(),
      amount: item.amount || 0,
      gender: (item.gender || 'unknown').toLowerCase()
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching latest sponsors:', error);
    throw error;
  }
};

const getUserSponsoredAnimals = async (email) => {
  
  try {
    // Fetch user's sponsorship records
    const { data: { sponsors } } = await axios.get(`${API_URL}selected-email-sponsor/${email}`);
    
    // Fetch all available animals
    const { data: { response: allAnimals } } = await axios.get(`${API_URL}all-sponserdata`);

    // Create a map for quick lookup by sdId
    const animalMap = new Map(allAnimals.map(animal => [animal.sdId, animal]));

    // Transform and merge data
    return sponsors
      .map(sponsor => {
        const animal = animalMap.get(sponsor.pId);
        if (!animal) return null;

        return {
          id: animal.sdId?.toString() || 'unknown',
          recId: sponsor.sId?.toString() || 'unknown',
          name: animal.name || 'Unnamed Animal',
          type: (animal.type || 'other').toLowerCase(),
          age: animal.age || 0,
          breed: animal.breed || 'Unknown Breed',
          color: animal.color || 'Unknown Color',
          image: animal.image || '/placeholder.webp',
          description: animal.description || 'No description available',
          date: sponsor.sponserDate || new Date().toISOString(),
          status: (animal.status || 'unknown').toLowerCase(),
          amount: animal.amount || 0,
          gender: (animal.gender || 'unknown').toLowerCase()
        };
      })
      .filter(Boolean); // Remove null entries
  } catch (error) {
    console.error('Error fetching sponsored animals:', error);
    throw error;
  }
};

const getSponsorDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}selected-sponserdata/${id}`);
    const data = response.data.response;

    if (!data) {
      throw new Error('No sponsor data found');
    }

    return {
      id: data.sdId?.toString() || 'unknown',
      name: data.name || 'Unnamed Animal',
      type: (data.type || 'other').toLowerCase(),
      age: data.age || 0,
      breed: data.breed || 'Unknown Breed',
      color: data.color || 'Unknown Color',
      image: data.image || '/placeholder.webp',
      description: data.description || 'No description available',
      date: data.sponserDataDate || new Date().toISOString(),
      status: (data.status || 'unknown').toLowerCase(),
      amount: data.amount || 0,
      gender: (data.gender || 'unknown').toLowerCase()
    };
    
  } catch (error) {
    console.error('Error fetching sponsor details:', error);
    throw error;
  }
};

async function updatePetStatus (petId, newStatus) {
  try {
    const response = await axios.put(`${API_URL}update-sponser-status/${petId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error('Error updating pet status:', error);
    throw error;
  }
}

async function own_a_Pet (data) {
  try {
    const response = await axios.post(`${API_URL}create-sponsor`, data);
    const change_status = await updatePetStatus(data.pId, 'Adopted');
    return { 
      responseData: response.data, 
      statusData: change_status.data 
    };
  } catch (error) {
    console.error('Error updating pet status:', error);
    throw error;
  }
}

async function disown_a_Pet ( recID, petId ) {
  try {
    const response = await axios.delete(`${API_URL}delete-sponsor/${recID}`);
    const change_status = await updatePetStatus(petId, 'Available');
    return {
      responseData: response.data, 
      statusData: change_status.data
    };
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    throw error;
  }
}

// Export both function 
export { fetchSponsorData, fetchLast6Sponsors, getUserSponsoredAnimals, getSponsorDetails, own_a_Pet, disown_a_Pet };