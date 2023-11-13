import './App.css'
import mmli from './assets/mmli.png'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import { useState } from 'react'
import allMolecules from './molecule_database'
import Database from './Database'

const Maker = ({socket}) => {
  const purple = "src/assets/purple.png";
  const green = "src/assets/green.png";
  const blue = "src/assets/blue.png"
  const [selectedImages, setSelectedImages] = useState([purple, green, blue]);
  const images = [
    'src/assets/C12H8N.png',
    'src/assets/C12H10N.png',
    'src/assets/C14H14N.png',
    'src/assets/C20H12N.png',
    'src/assets/C6H3F.png',
    'src/assets/C6H4.png',
    'src/assets/C8H6.png',
    'src/assets/C10H6.png',
    'src/assets/C4H3N2.png',
    'src/assets/C4H3S.png',
    'src/assets/C6H4NO2.png',
    'src/assets/C7H4N.png',
  ];

  const handleImageSelect = (index) => { 
    console.log(index) 
    var selectedImage = images[index];
    const molecule = allMolecules[selectedImage];
    if (molecule.color == "purple") {
      setSelectedImages([selectedImage, selectedImages[1], selectedImages[2]]);
    } else if (molecule.color == "green") {
      setSelectedImages([selectedImages[0], selectedImage, selectedImages[2]])
    } else if (molecule.color == "blue") {
      setSelectedImages([selectedImages[0], selectedImages[1], selectedImage])
    }
  }

  const handleSubmit = () => {
    if (selectedImages.length == 3 && selectedImages[0] != purple && selectedImages[1] != green && selectedImages[2] != blue) {
      socket.emit('imagesSelected', selectedImages);
    } else {
      alert("Invalid moleucle submitted!");
    }
  }

  return (
    <section className="maker-container">
        <img className='mmli-img'src={mmli} alt="mmli" />
    <div className="main-container">
      <Sidebar images={images} handleImageSelect={handleImageSelect} selectedImages={selectedImages} />
      <MainContent selectedImages={selectedImages} />
      <button style={{padding: "1rem"}} onClick={handleSubmit}>Submit</button>
    </div>
    </section>
  );
};
  
export default Maker;