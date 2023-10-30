import PropTypes from 'prop-types';

const Sidebar = ({ images, handleImageSelect, selectedImages }) => {
    return (
      <div className="sidebar" style={{
    
      
      }}>
        <h2>Select Molecules</h2>
        <div className="image-list">
          {images.map((image, index) => (
            <img
            width={70}
              key={index}
              src={image}
              alt={`Image ${index}`}
              onClick={() => handleImageSelect(index)}
              className={selectedImages.includes(image) ? 'selected' : ''}
            />
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

  