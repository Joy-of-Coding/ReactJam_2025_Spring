import React from 'react';
import img1 from '../../assets/img/black_van.svg';
import img2 from '../../assets/img/green_bullet_mk2.svgge2.jpg';
import img3 from '../../assets/img/white_coupe.svg';
import img4 from '../../assets/img/white_coupe.svg'
const images = [img1,img2,img3,img4];

const Carscreentest = () => {
  return (
    
    <div>
      <h1>Gallery</h1>
      {images.map((imgSrc, index) => (
        <img key={index} src={imgSrc} alt={`Image ${index + 1}`} style={{ width: '200px', marginRight: '10px' }} />
      ))}
    </div>
  );
};

export default Carscreentest;
