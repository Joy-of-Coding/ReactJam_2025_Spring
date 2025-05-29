import React from 'react';
import img1 from '../../assets/img/black_van.svg';
import img2 from '../../assets/img/green_van.svg';
import img3 from '../../assets/img/white_coupe.svg';
import img4 from '../../assets/img/sports_car.svg';
import img5 from '../../assets/img/dreamstreamer.svg';
import img6 from '../../assets/img/suv.svg';
import img7 from '../../assets/img/van.svg';
import img8 from '../../assets/img/spark.svg';
import img9 from '../../assets/img/leafluxe_eco.svg';
import img10 from '../../assets/img/green_bullet_mk2.svg';
import img11 from '../../assets/img/red_comet_zr.svg';
import img12 from '../../assets/img/gruntxl_v8.svg';
const images = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,];

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
