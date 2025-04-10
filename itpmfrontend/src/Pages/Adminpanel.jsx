import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import './AdminPanel.css';

function AdminPanel() {
  const [pets, setPets] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchPets = async () => {
    setLoading(true);
    setIsSearching(true);
    try {
      const response = await axios.get('http://localhost:3001/api/pets', {
        params: { customerName },
      });
      setPets(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch pets data',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const deletePet = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this pet record permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/pets/${id}`);
        Swal.fire({
          title: 'Deleted!',
          text: 'Pet record has been removed successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        fetchPets();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete pet record',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  const updatePet = async (id, currentPet) => {
    const { value: updatedValues } = await Swal.fire({
      title: 'Update Pet Details',
      html: `
        <div class="swal-form-group">
          <label for="swal-input-breed">Breed:</label>
          <input id="swal-input-breed" class="swal2-input" placeholder="Enter Breed" value="${currentPet.breed || ''}">
        </div>
        <div class="swal-form-group">
          <label for="swal-input-age">Age:</label>
          <input id="swal-input-age" class="swal2-input" type="number" placeholder="Enter Age" value="${currentPet.age || ''}">
        </div>
        <div class="swal-form-group">
          <label for="swal-input-symptoms">Symptoms:</label>
          <textarea id="swal-input-symptoms" class="swal2-textarea" placeholder="Describe Symptoms">${currentPet.symptoms || ''}</textarea>
        </div>
        <div class="swal-form-group">
          <label for="swal-input-behavior">Behavior Patterns:</label>
          <textarea id="swal-input-behavior" class="swal2-textarea" placeholder="Describe Behavior Patterns">${currentPet.behavior || ''}</textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        const breed = document.getElementById('swal-input-breed').value.trim();
        const age = parseInt(document.getElementById('swal-input-age').value, 10);
        const symptoms = document.getElementById('swal-input-symptoms').value.trim();
        const behavior = document.getElementById('swal-input-behavior').value.trim();

        if (!breed) {
          Swal.showValidationMessage('Breed cannot be empty');
          return false;
        }

        if (isNaN(age) || age <= 0 || age > 30) {
          Swal.showValidationMessage('Age must be between 1 and 30');
          return false;
        }

        return { breed, age, symptoms, behavior };
      },
    });

    if (updatedValues) {
      try {
        await axios.put(`http://localhost:3001/api/pets/${id}`, updatedValues);
        Swal.fire({
          title: 'Updated!',
          text: 'Pet details have been updated successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        fetchPets();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update pet details',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/report');
      setReport(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to generate report',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!report) {
      Swal.fire({
        title: 'Error',
        text: 'No report data to download',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const doc = new jsPDF();
    
    // Add header with styling
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('Pet Management Report', 105, 15, { align: 'center' });
    
    // Reset text color for body content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    // Add current date
    const today = new Date();
    doc.text(`Generated on: ${today.toLocaleDateString()}`, 20, 30);
    
    // Add total pets
    doc.setFontSize(14);
    doc.text(`Total Pets: ${report.petCount}`, 20, 45);

    // Add breed breakdown
    doc.setFontSize(14);
    doc.text('Breed Breakdown:', 20, 60);
    
    let yPosition = 70;
    report.breedCount.forEach((item) => {
      doc.setFontSize(12);
      doc.text(`${item._id}: ${item.count}`, 30, yPosition);
      yPosition += 10;
    });
    
    // Add footer
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 280, 210, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('Pet Management System', 105, 287, { align: 'center' });

    doc.save('Pet_Management_Report.pdf');
  };

  // Initial load of pets
  useEffect(() => {
    fetchPets();
  }, []);

  // Filter pets when customerName changes
  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (customerName.trim() !== '') {
        fetchPets();
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [customerName]);

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Pet Management Dashboard</h1>
      </header>

      <div className="admin-body">
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <i className="sidebar-icon dashboard-icon"></i>
            <span>Dashboard</span>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className="active"><a href="#pets"><i className="nav-icon pets-icon"></i> Pets</a></li>
              <li><a href="#report"><i className="nav-icon report-icon"></i> Reports</a></li>
              <li><a href="#settings"><i className="nav-icon settings-icon"></i> Settings</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="admin-content">
          <div className="content-header">
            <h2>Pet Records</h2>
            <div className="search-section">
              <div className="search-input-container">
                <i className="search-icon"></i>
                <input
                  type="text"
                  placeholder="Search by Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <button 
                onClick={fetchPets} 
                className="search-button"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="card-icon total-icon"></div>
              <div className="card-content">
                <h3>Total Pets</h3>
                <p>{report?.petCount || pets.length}</p>
              </div>
            </div>
            
            <div className="dashboard-card">
              <div className="card-icon breeds-icon"></div>
              <div className="card-content">
                <h3>Unique Breeds</h3>
                <p>{report?.breedCount?.length || '—'}</p>
              </div>
            </div>
          </div>

          <div className="section-title">
            <h3>Pet Records</h3>
          </div>

          {loading && !isSearching ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <div className="pet-table-container">
              {pets.length > 0 ? (
                <table className="pet-table">
                  <thead>
                    <tr>
                      <th>Pet ID</th>
                      <th>Breed</th>
                      <th>Age</th>
                      <th>Customer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pets.map((pet) => (
                      <tr key={pet._id}>
                        <td>{pet._id.substring(0, 8)}...</td>
                        <td>{pet.breed}</td>
                        <td>{pet.age}</td>
                        <td>{pet.customerName}</td>
                        <td className="actions-cell">
                          <button 
                            onClick={() => updatePet(pet._id, pet)} 
                            className="update-btn"
                            title="Update Pet Details"
                          >
                            <i className="edit-icon"></i>
                          </button>
                          <button 
                            onClick={() => deletePet(pet._id)} 
                            className="delete-btn"
                            title="Delete Pet Record"
                          >
                            <i className="delete-icon"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon"></div>
                  <p>No pets found matching your search criteria</p>
                </div>
              )}
            </div>
          )}

          <div className="report-section" id="report">
            <div className="section-title">
              <h3>Analytics & Reports</h3>
            </div>
            
            <div className="report-actions">
              <button 
                className="generate-report-btn" 
                onClick={generateReport}
                disabled={loading}
              >
                <i className="report-icon"></i>
                <span className="genbtn">Generate Report</span>
              </button>
            </div>

            {report && (
              <div className="report-details">
                <div className="report-card">
                  <div className="report-header">
                    <h3>Report Summary</h3>
                    <button 
                      className="download-pdf-btn" 
                      onClick={downloadPDF}
                      title="Download as PDF"
                    >
                      <i className="download-icon"></i>
                      <span>Export PDF</span>
                    </button>
                  </div>
                  
                  <div className="report-content">
                    <div className="report-metric">
                      <span className="metric-label">Total Pets:</span>
                      <span className="metric-value">{report.petCount}</span>
                    </div>
                    
                    <div className="breed-breakdown">
                      <h4>Breed Breakdown:</h4>
                      <div className="breed-list">
                        {report.breedCount.map((item) => (
                          <div key={item._id} className="breed-item">
                            <span className="breed-name">{item._id || 'Unknown'}</span>
                            <span className="breed-count">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;