import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Firstaidpage.css';

function Firstaidpage() {
  const [isLoading, setIsLoading] = useState(false);
  const [petCount, setPetCount] = useState(0);
  
  useEffect(() => {
    // Fetch pet count on component mount
    const fetchPetCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getPetCount');
        setPetCount(response.data.count);
      } catch (error) {
        console.error('Failed to fetch pet count:', error);
      }
    };
    
    fetchPetCount();
  }, []);

  const showFormPopup = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Enter Pet Details',
      html: `
        <div class="swal-form-container">
          <div class="swal-form-group">
            <label for="swal-input1">Customer Name</label>
            <input id="swal-input1" class="swal2-input" placeholder="Enter full name">
          </div>
          <div class="swal-form-group">
            <label for="swal-input2">Pet Breed</label>
            <input id="swal-input2" class="swal2-input" placeholder="E.g., Golden Retriever">
          </div>
          <div class="swal-form-group">
            <label for="swal-input3">Pet Age (years)</label>
            <input id="swal-input3" class="swal2-input" placeholder="1-15" type="number" min="1" max="15">
          </div>
          <div class="swal-form-group">
            <label for="swal-input4">Symptoms</label>
            <textarea id="swal-input4" class="swal2-textarea" placeholder="Describe any symptoms you've observed"></textarea>
          </div>
          <div class="swal-form-group">
            <label for="swal-input5">Behavior Patterns</label>
            <textarea id="swal-input5" class="swal2-textarea" placeholder="Describe recent behavior changes"></textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'swal-container',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      },
      preConfirm: () => {
        const customerName = document.getElementById('swal-input1').value.trim();
        const breed = document.getElementById('swal-input2').value.trim();
        const ageInput = document.getElementById('swal-input3').value.trim();
        const symptoms = document.getElementById('swal-input4').value.trim();
        const behavior = document.getElementById('swal-input5').value.trim();

        const nameRegex = /^[A-Za-z\s]+$/; // Only letters & spaces
        const age = parseInt(ageInput, 10);

        if (!customerName || !nameRegex.test(customerName)) {
          Swal.showValidationMessage('Customer name must contain only letters and spaces.');
          return false;
        }

        if (!breed || !nameRegex.test(breed)) {
          Swal.showValidationMessage('Breed must contain only letters and spaces.');
          return false;
        }

        if (!ageInput || isNaN(age) || age < 1 || age > 15) {
          Swal.showValidationMessage('Age must be a number between 1 and 15.');
          return false;
        }

        if (!symptoms) {
          Swal.showValidationMessage('Symptoms cannot be empty.');
          return false;
        }

        if (!behavior) {
          Swal.showValidationMessage('Behavior patterns cannot be empty.');
          return false;
        }

        return { customerName, breed, age, symptoms, behavior };
      }
    });

    if (formValues) {
      setIsLoading(true);
      try {
        const checkResponse = await axios.get('http://localhost:3001/checkPet', { 
          params: { breed: formValues.breed, symptoms: formValues.symptoms } 
        });

        if (checkResponse.data.exists) {
          Swal.fire({
            title: 'Duplicate Found',
            text: 'A pet with the same breed and symptoms already exists.',
            icon: 'warning',
          });
          setIsLoading(false);
          return;
        }

        const response = await axios.post('http://localhost:3001/createPet', formValues);
        
        if (response.status === 201) {
          // Update pet count
          setPetCount(prevCount => prevCount + 1);
          
          Swal.fire({
            title: 'Success!',
            text: 'Pet details added successfully.',
            icon: 'success',
          });
        } else {
          throw new Error('Unexpected server response');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Failed to save data. Please try again.',
          icon: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="firstaid-page-container">
        <section className="firstaid-hero-section">
          <div className="firstaid-hero-content">
            <h1 className="firstaid-title">Pet First Aid Information</h1>
            <p className="firstaid-subtitle">
              Essential information to help your pet in emergency situations
            </p>
          </div>
        </section>
        
        <section className="firstaid-cards-section">
 
          
          <div className="pet-stats-container">
            <div className="pet-stat-card">
              <span className="stat-icon">🐾</span>
              <span className="stat-number">{petCount}</span>
              <span className="stat-label">Pets Helped</span>
            </div>
          </div>
        </section>
        
        <button 
          className="pet-details-button"
          onClick={showFormPopup}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="button-content">
              <div className="loading-spinner"></div>
              Processing...
            </span>
          ) : (
            <span className="button-content">
              <span className="button-icon">+</span>
              Enter Pet Details
            </span>
          )}
        </button>
        
        <section className="firstaid-info-section">
          <div className="info-card">
            <span className="info-icon">ℹ️</span>
            <h3>Why Record Pet Details?</h3>
            <p>
              Recording your pet's symptoms and behavior helps veterinarians provide 
              better care in emergencies. This information can be crucial for 
              proper diagnosis and treatment.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Firstaidpage;