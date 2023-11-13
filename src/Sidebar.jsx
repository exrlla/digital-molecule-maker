import PropTypes from 'prop-types';
import MoleculeDisplay from './MoleculeDisplay';

const Sidebar = ({ images, handleImageSelect, selectedImages }) => {
    return (
      <div className="sidebar" style={{backgroundColor: 'white', marginTop: "1em", padding: "1rem", width: "200px", color: 'black'}}>
        <h2>Select Molecules</h2>
        <div className="image-list" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"}}>
          {images.map((image, index) => (
            <div key={index} onClick={() => handleImageSelect(index)} style={{marginTop: "1rem"}}>
              <MoleculeDisplay 
                width={75} 
                height={70}
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

  