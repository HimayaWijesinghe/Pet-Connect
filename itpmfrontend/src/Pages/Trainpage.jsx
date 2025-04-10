import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Trainpage.css';

const Trainpage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Training videos categorized by age - updated according to specifications
  const trainingVideos = {
    puppy: [
      { 
        id: "Vdby3yQKYcU", 
        title: "Puppy Training Basics",
        description: "Essential training for puppies up to 2 years old",
        type: "short"
      }
    ],
    adult: [
      {
        id: "xpzjtHPQpOk",
        title: "Adult Dog Training Techniques",
        description: "Professional training methods for adult dogs (2-7 years)",
        type: "video"
      }
    ],
    senior: [
      {
        id: "1oDGa2yPb2g",
        title: "Senior Dog Care & Training",
        description: "Gentle training techniques for senior dogs (8+ years)",
        type: "video"
      }
    ],
    general: [
      {
        id: "jFMA5ggFsXU",
        title: "General Pet Training Guide",
        description: "Training tips suitable for all pets",
        type: "video"
      }
    ]
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/pets');
        setPets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pets');
        setLoading(false);
      }
    };
    
    fetchPets();
  }, []);

  // Updated age categorization function
  const getAgeCategory = (age) => {
    if (age < 2) return { label: 'Puppy', className: 'puppy', category: 'puppy' };
    if (age < 8) return { label: 'Adult', className: 'adult', category: 'adult' };
    return { label: 'Senior', className: 'senior', category: 'senior' };
  };

  // Function to render YouTube video component
  const renderVideoEmbed = (videoId, type) => {
    const baseUrl = type === 'short' 
      ? `https://www.youtube.com/embed/${videoId}?loop=1`
      : `https://www.youtube.com/embed/${videoId}`;
    
    return (
      <div className="video-container">
        <iframe
          width="100%"
          height="200"
          src={baseUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading pets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="training-page-container">
        <div className="error-message">
          <p>{error}</p>
          <button
            className="view-button"
            style={{ maxWidth: '200px', margin: '20px auto' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="training-page-container">
      <h1 className="page-title">Pet Training Videos</h1>
      <p className="page-subtitle">Find age-appropriate training videos tailored to your pet's needs</p>
      
      {pets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🐾</div>
          <p className="empty-message">No pets found. Add pets to see training recommendations.</p>
          <Link to="/pets/add" className="view-button" style={{ maxWidth: '200px', margin: '0 auto' }}>
            Add Pet
          </Link>
        </div>
      ) : (
        <div className="pets-grid">
          {pets.map(pet => {
            const ageCategory = getAgeCategory(pet.age);
            const recommendedVideos = trainingVideos[ageCategory.category] || [];
            
            return (
              <div key={pet._id} className="pet-card">
                <div className="pet-card-header">
                  <h2 className="pet-card-title">{pet.customerName}'s Pet</h2>
                </div>
                <div className="pet-card-body">
                  <div className="pet-info">
                    <span className="pet-info-label">Breed:</span>
                    <span className="pet-info-value">{pet.breed}</span>
                  </div>
                  <div className="pet-info">
                    <span className="pet-info-label">Age:</span>
                    <span className="pet-info-value">{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                  </div>
                  <div className="pet-info">
                    <span className="pet-info-label">Category:</span>
                    <span className={`pet-age-badge ${ageCategory.className}`}>
                      {ageCategory.label}
                    </span>
                  </div>
                  
                  <div className="training-section">
                    <h3 className="training-section-title">Age-Appropriate Training</h3>
                    <div className="age-category-label">
                      Training for {ageCategory.label} ({getAgeRangeText(ageCategory.category)})
                    </div>
                    <div className="training-videos">
                      {recommendedVideos.length > 0 ? (
                        recommendedVideos.map((video, index) => (
                          <div key={index} className="video-item">
                            {renderVideoEmbed(video.id, video.type)}
                            <h4 className="video-title">{video.title}</h4>
                            <p className="video-description">{video.description}</p>
                          </div>
                        ))
                      ) : (
                        <p>No videos available for this pet category</p>
                      )}
                    </div>
                    <Link to={`/training/${pet._id}`} className="view-button">
                      View More Training Videos
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* General Training Videos Section */}
      <div className="general-training-section">
        <h2 className="section-title">General Training Resources</h2>
        <p className="section-description">Training videos suitable for all pets regardless of age</p>
        <div className="general-videos-grid">
          {trainingVideos.general.map((video, index) => (
            <div key={index} className="general-video-card">
              {renderVideoEmbed(video.id, video.type)}
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get age range text
const getAgeRangeText = (category) => {
  switch(category) {
    case 'puppy':
      return 'up to 2 years old';
    case 'adult':
      return '2-7 years old';
    case 'senior':
      return '8+ years old';
    default:
      return '';
  }
};

export default Trainpage;