import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

// Function to fetch all donations
export async function getAllDonations() {
    try {
        console.log(`Fetching donations from: ${BASE_URL}/all-donations`);
        const response = await axios.get(`${BASE_URL}/all-donations`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching donations:', error.response?.data || error.message);
        throw error;
    }
}

// Function to fetch all donors
export async function getAllDonors() {
    try {
        console.log(`Fetching donors from: ${BASE_URL}/all-donors`);
        const response = await axios.get(`${BASE_URL}/all-donors`);
        return response.data;
    } catch (error) {
        console.error('Error fetching donors:', error.response?.data || error.message);
        throw error;
    }
}

// Function to create a new donation
export async function createDonation(donationData) {
    try {
        console.log(`Creating donation at: ${BASE_URL}/create-donation`, donationData);
        const response = await axios.post(`${BASE_URL}/create-donation`, donationData);
        return response.data;
    } catch (error) {
        console.error('Error creating donation:', error.response?.data || error.message);
        throw error;
    }
}

// Function to update an existing donation
export async function updateDonation(donationId, updatedData) {
    try {
        if (!donationId) throw new Error('Donation ID is required');
        console.log(`Updating donation at: ${BASE_URL}/update-donation/${donationId}`, updatedData);
        const response = await axios.put(`${BASE_URL}/update-donation/${donationId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating donation:', error.response?.data || error.message);
        throw error;
    }
}
