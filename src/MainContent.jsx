import PropTypes from 'prop-types';

const MainContent = ({ selectedImages }) => {
    return (
    <div className="main-content" style={{
        display: 'flex',
        backgroundColor: 'Gainsboro',
        borderRadius: '10px',
        marginInline: '5rem',
        width: '80%',
        height: '15rem',
        alignItems: 'center',
        justifyContent: 'center',
        
    }}>
      {selectedImages.length <= 3 ? (
        selectedImages.map((image, index) => (
          <img width={200} height={190}key={index} src={image} alt={`Selected Image ${index}`} />
        ))
      ) : (
        ''
      )}
    </div>
    );
};

MainContent.propTypes = {
    selectedImages: PropTypes.string,
};

export default MainContent;
