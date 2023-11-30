import PropTypes from 'prop-types';
import './App.css'

const MoleculeDisplay = ({image, width, height}) => {
    //dipslays the molecule image and its name
    const name = image.substring(11, image.length - 4);
    return (
        <>
            <div className="molecule-display" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
                <img src={image} style={{width: width, height: height}} />
                <p style={{marginTop: ".1em", color:'#131737'}}>{name}</p>
            </div>
        </>
    );
};

MoleculeDisplay.propTypes = {
    image: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number
};

export default MoleculeDisplay;
