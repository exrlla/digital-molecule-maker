import PropTypes from 'prop-types';
import allMolecules from './molecule_database'

const MainContent = ({ selectedMolecules }) => {

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
      {selectedMolecules.length <= 3 ? (
        selectedMolecules.map((moleculeKey, index) => (
          displayMolecule(moleculeKey, index)
        ))
      ) : (
        ''
      )}
    </div>
    );
};

const displayMolecule = (moleculeKey, index) => {
  if (allMolecules[moleculeKey] !== undefined) {
    return  <img title={allMolecules[moleculeKey].name} width={200} height={190}key={index} src={allMolecules[moleculeKey].imagePath} alt={`Selected Image ${index}`} />
  } else {
    // display blue, purple..placeholder
    return  <img title={moleculeKey} width={200} height={190}key={index} src={`src/assets/${moleculeKey}.png`} alt={`Selected Image ${index}`} />
  }
  
}

MainContent.propTypes = {
  selectedMolecules: PropTypes.arrayOf(PropTypes.string),
};

export default MainContent;
