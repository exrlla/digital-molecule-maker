import PropTypes from 'prop-types';

const Sidebar = ({ molecules, handleImageSelect, selectedMolecules }) => {
    return (
      <div className="sidebar" style={{}}>
        <h2>Select Molecules</h2>
        <div className="image-list">
          {molecules.map((molecule, index) => (
            <img
            width={70}
              key={index}
              src={molecule.imagePath}
              alt={`Image ${index}`}
              onClick={() => handleImageSelect(molecule.id)}
              className={selectedMolecules.includes(molecule.id) ? 'selected' : ''}
              title={molecule.name}
            />
          ))}
        </div>
      </div>
    );
  };
  
  Sidebar.propTypes = {
    molecules: PropTypes.array.isRequired,
    handleImageSelect: PropTypes.func.isRequired,
    selectedMolecules: PropTypes.array.isRequired,
  };
  
  export default Sidebar;

  