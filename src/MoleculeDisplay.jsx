import PropTypes from 'prop-types';

const MoleculeDisplay = ({image, width, height}) => {
    //dipslays the molecule image and its name
    const name = image.substring(11, image.length - 4);
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <img src={image}  style={{width: width, height: height}}/>
                <p style={{marginTop: ".1em", color:'black'}}>{name}</p>
            </div>
        </>
    );
};

MoleculeDisplay.propTypes = {
    image: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};


export default MoleculeDisplay;