import React from 'react';


const styles = {
  ImageContainer: {
    position: 'relative',
    left: '0px',
    width: '100%',
    height: '600px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    padding: '15px 24px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white', 
    borderRadius: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: '0.3s',
    position: 'relative',
    right:'666px',
    top: '230px',
  },
  ButtonHover: {
    backgroundColor: '#ff4500', 
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/26785ea6-94b1-4d66-a0bd-f08affe71a2b.png',
};

const Image = (props) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url(${props.image ?? defaultProps.image})`,
    }}>
  
     
      
    </div>
  );
};

export default Image;
