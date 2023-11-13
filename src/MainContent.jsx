import PropTypes from 'prop-types';
import MoleculeDisplay from './MoleculeDisplay';

const MainContent = ({ selectedImages }) => {
    return (
      // shows the molecule the user has currently built.
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
        <MoleculeDisplay image={selectedImages[0]} width={200} height={150}></MoleculeDisplay>
        <MoleculeDisplay image={selectedImages[1]} width={175} height={150}></MoleculeDisplay>
        <MoleculeDisplay image={selectedImages[2]} width={175} height={150}></MoleculeDisplay>
      </div>
    );
};

MainContent.propTypes = {
  selectedImages: PropTypes.arrayOf(PropTypes.string),
};

export default MainContent;
