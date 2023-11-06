import './App.css'
import mmli from './assets/mmli.png'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import { useState } from 'react'

const Maker = ({socket}) => {
    const [selectedImages, setSelectedImages] = useState([]);
  const images = [
    'src/assets/C4H3N2.png',
    'src/assets/C4H3S.png',
    'src/assets/C6H3F.png',
    'src/assets/C4H3N2.png',
    'src/assets/C4H3S.png',
    'src/assets/C6H3F.png',
    'src/assets/C4H3N2.png',
    'src/assets/C4H3S.png',
    'src/assets/C6H3F.png',
    // Add more image URLs as needed
  ];

  const handleImageSelect = (index) => {
    const selectedImage = images[index];
  
    // Check if the image is already selected and toggle its selection
    if (selectedImages.includes(selectedImage)) {
      setSelectedImages(selectedImages.filter((img) => img !== selectedImage));
    } else {
      setSelectedImages([...selectedImages, selectedImage]);
    }
  
    // Emit the updated selectedImages array
    socket.emit('imagesSelected', selectedImages);
  };

  return (
    <section className="maker-container">
        <img className='mmli-img'src={mmli} alt="mmli" />
    <div className="main-container">
      <Sidebar images={images} handleImageSelect={handleImageSelect} selectedImages={selectedImages} />
      <MainContent selectedImages={selectedImages} />
    </div>
    </section>
  );
};
  
export default Maker