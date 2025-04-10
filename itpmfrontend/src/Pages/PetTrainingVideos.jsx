import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


const PetTrainingVideos = () => {
  const { id } = useParams();
  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainingVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/training-videos/${id}`);
        setTrainingData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch training videos');
        setLoading(false);
      }
    };

    fetchTrainingVideos();
  }, [id]);

  const getCategoryInfo = (category) => {
    switch(category) {
      case 'puppy': 
        return { 
          label: 'Puppy (Under 1 year)', 
          className: 'category-puppy' 
        };
      case 'adult': 
        return { 
          label: 'Adult Dog (1-7 years)', 
          className: 'category-adult' 
        };
      case 'senior': 
        return { 
          label: 'Senior Dog (8+ years)', 
          className: 'category-senior' 
        };
      default: 
        return { 
          label: 'Unknown Age Category', 
          className: '' 
        };
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading training videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="training-videos-container">
        <Link to="/training" className="back-link">
          <span className="back-arrow">←</span> Back to All Pets
        </Link>
        <div className="error-message">
          <p>{error}</p>
          <button 
            className="watch-button" 
            style={{ marginTop: '20px' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!trainingData) {
    return (
      <div className="training-videos-container">
        <Link to="/training" className="back-link">
          <span className="back-arrow">←</span> Back to All Pets
        </Link>
        <div className="empty-state">
          <div className="empty-icon">🐾</div>
          <p className="empty-message">No training data available for this pet</p>
        </div>
      </div>
    );
  }

  const { pet, category, videos } = trainingData;
  const categoryInfo = getCategoryInfo(category);

  return (
    <div className="training-videos-container">
      <Link to="/training" className="back-link">
        <span className="back-arrow">←</span> Back to All Pets
      </Link>
      
      <div className="pet-info-card">
        <h1 className="pet-name">Training for {pet.customerName}'s Pet</h1>
        
        <div className="pet-detail">
          <span className="pet-detail-label">Breed:</span>
          <span className="pet-detail-value">{pet.breed}</span>
        </div>
        
        <div className="pet-detail">
          <span className="pet-detail-label">Age:</span>
          <span className="pet-detail-value">{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
        </div>
        
        <div className="pet-detail">
          <span className="pet-detail-label">Symptoms:</span>
          <span className="pet-detail-value">{pet.symptoms}</span>
        </div>
        
        <div className="pet-detail">
          <span className="pet-detail-label">Behavior:</span>
          <span className="pet-detail-value">{pet.behavior}</span>
        </div>
        
        <div className={`category-label ${categoryInfo.className}`}>
          {categoryInfo.label}
        </div>
      </div>

      <h2 className="section-title">Recommended Training Videos</h2>
      
      <div className="videos-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <div className="video-thumbnail">
              <div className="video-play-icon">▶️</div>
              <div className="video-overlay">
                <div className="play-button">▶</div>
              </div>
            </div>
            <div className="video-content">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="watch-button"
              >
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetTrainingVideos;