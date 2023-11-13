import PropTypes from 'prop-types';

const MoleculeDisplay = ({image, width, height}) => {
    const name = image.substring(11, image.length - 4);
    return (
        <>
            <div style={{width: width, height: height, display: 'flex', flexDirection: 'column'}}>
                <img src={image}/>
                <p style={{marginTop: "2px", color:'black'}}>{name}</p>
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