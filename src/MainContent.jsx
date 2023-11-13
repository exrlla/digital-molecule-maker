import PropTypes from 'prop-types';
import MoleculeDisplay from './MoleculeDisplay';

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
          <MoleculeDisplay image={image} width={200} height={190} key={index}></MoleculeDisplay>
          // <img title={image.substring(11, image.length - 4)} width={200} height={190}key={index} src={image} alt={`Selected Image ${index}`} />
        ))
      ) : (
        ''
      )}
    </div>
    );
};

MainContent.propTypes = {
  selectedImages: PropTypes.arrayOf(PropTypes.string),
};

export default MainContent;
