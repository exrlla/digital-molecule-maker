import PropTypes from 'prop-types';
import MoleculeDisplay from './MoleculeDisplay';

const Sidebar = ({ images, handleImageSelect, selectedImages }) => {
    //shows each available molecule to build the trimer
    return (
      <div className="sidebar" style={{backgroundColor: 'white', marginTop: "1em", padding: "1rem", width: "200px", color: 'black'}}>
        <h2>Select Molecules</h2>
        <div className="image-list" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"}}>
          {/* Maps each image available to a MoleculeDisplay option */}
          {images.map((image, index) => (
            // When a sidebar molecule is clicked, the molecule will be added to the built molecule
            <div key={index} onClick={() => handleImageSelect(index)} style={{marginTop: ".2rem", width: "45%"}}>
              <MoleculeDisplay 
                image={image} 
                className={selectedImages.includes(image) ? 'selected' : ''}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  Sidebar.propTypes = {
    images: PropTypes.array.isRequired,
    handleImageSelect: PropTypes.func.isRequired,
    selectedImages: PropTypes.array.isRequired,
  };
  
  export default Sidebar;

  