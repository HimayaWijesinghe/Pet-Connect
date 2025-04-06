import React, { useEffect } from 'react';

const PetDetailPopup = ({ pet, onClose }) => {

  const getRandomFoundDate = () => {
    const currentDate = new Date();

    const daysAgo = Math.floor(Math.random() * 10) + 1;
    currentDate.setDate(currentDate.getDate() - daysAgo);
    return currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Mock reunion details
  const reunionDetails = {
    foundDate: getRandomFoundDate(),
    foundLocation: `${Math.floor(Math.random() * 5) + 1} miles from home`,
    daysMissing: Math.floor(Math.random() * 14) + 1,
    foundBy: ["a neighbor", "a local animal shelter", "a Good Samaritan", "a PawBoost community member"][Math.floor(Math.random() * 4)]
  };

  // Full story (extended version of the preview)
  const fullStory = pet.story.replace('"', '').replace('..."', '') + 
    ` comes back home within a few hours. This time he didn't return for over ${reunionDetails.daysMissing} days. We were getting really worried as the days went by.
    
    We posted on PawBoost and shared on social media. After ${reunionDetails.daysMissing} days, we received a call from ${reunionDetails.foundBy} who had seen our post on PawBoost. They had found ${pet.name} ${reunionDetails.foundLocation} and had been caring for him.
    
    We are so grateful to the PawBoost community for helping us reunite with our beloved ${pet.name}. The power of community really makes a difference in bringing lost pets home!`;

  // Close on escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling of background content
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Close when clicking outside the popup
  const handleOverlayClick = (e) => {
    if (e.target.className === 'pet-detail-overlay') {
      onClose();
    }
  };

  return (
    <div className="pet-detail-overlay" onClick={handleOverlayClick}>
      <div className="pet-detail-popup">
        <button className="close-button" onClick={onClose} aria-label="Close popup">
          <i className="fas fa-times"></i>
        </button>
        
        <div className="pet-detail-header">
          <h2>{pet.name}'s Happy Tail Story</h2>
          <div className="pet-detail-location">
            <i className="fas fa-map-marker-alt"></i> {pet.location}
          </div>
        </div>
        
        <div className="pet-detail-content">
          <div className="pet-detail-image-container">
            <img src={pet.image} alt={pet.name} className="pet-detail-image" />
          </div>
          
          <div className="pet-stats">
            <div className="pet-stat-item">
              <i className="fas fa-calendar-check"></i>
              <span className="stat-label">Found Date:</span>
              <span className="stat-value">{reunionDetails.foundDate}</span>
            </div>
            <div className="pet-stat-item">
              <i className="fas fa-clock"></i>
              <span className="stat-label">Missing For:</span>
              <span className="stat-value">{reunionDetails.daysMissing} days</span>
            </div>
            <div className="pet-stat-item">
              <i className="fas fa-route"></i>
              <span className="stat-label">Found:</span>
              <span className="stat-value">{reunionDetails.foundLocation}</span>
            </div>
            <div className="pet-stat-item">
              <i className="fas fa-user-friends"></i>
              <span className="stat-label">Found By:</span>
              <span className="stat-value">{reunionDetails.foundBy}</span>
            </div>
          </div>
          
          <div className="full-story">
            <h3>The Full Story</h3>
            <p>{fullStory}</p>
          </div>
          
          <div className="social-engagement">
            <div className="engagement-stats">
              <div className="engagement-item">
                <i className="fas fa-thumbs-up"></i>
                <span>{pet.likes} Likes</span>
              </div>
              <div className="engagement-item">
                <i className="fas fa-comment-alt"></i>
                <span>{pet.comments} Comments</span>
              </div>
              <div className="engagement-item">
                <i className="fas fa-share-alt"></i>
                <span>{pet.shares} Shares</span>
              </div>
            </div>
            
            <div className="share-buttons">
              <button className="share-facebook">
                <i className="fab fa-facebook-f"></i> Share
              </button>
              <button className="share-twitter">
                <i className="fab fa-twitter"></i> Tweet
              </button>
              <button className="share-email">
                <i className="fas fa-envelope"></i> Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPopup;