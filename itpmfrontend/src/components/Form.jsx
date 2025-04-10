import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import './Firstaidpage.css';

function Firstaidpage() {
  const showFormPopup = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Enter Pet Details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Enter Breed">
        <input id="swal-input2" class="swal2-input" placeholder="Enter Age" type="number">
        <textarea id="swal-input3" class="swal2-textarea" placeholder="Describe Symptoms"></textarea>
        <textarea id="swal-input4" class="swal2-textarea" placeholder="Describe Behavior Patterns"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const breed = document.getElementById('swal-input1').value.trim();
        const age = parseInt(document.getElementById('swal-input2').value, 10);
        const symptoms = document.getElementById('swal-input3').value.trim();
        const behavior = document.getElementById('swal-input4').value.trim();

        if (!breed || isNaN(age) || !symptoms || !behavior) {
          Swal.showValidationMessage('All fields are required and age must be a number');
          return false;
        }

        return { breed, age, symptoms, behavior };
      }
    });

    if (formValues) {
      try {
        const response = await axios.post('http://localhost:5000/api/firstaid', formValues);
        
        if (response.status === 201) {
          Swal.fire({
            title: 'Success!',
            text: 'Pet details added successfully.',
            icon: 'success',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to save data. Please try again.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="firstaid-page-container">
        <Card />
    
        <button 
          onClick={showFormPopup} 
          className="pet-details-button"
          style={styles.button}
        >
          Type Pet Details
        </button>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  button: {
    position: "absolute",
    top: "65%",
    left: "15%",
    transform: "translate(-50%, -50%)",
    padding: "2em 3em",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Firstaidpage;
