import PropTypes from 'prop-types';

const MoleculeDisplay = ({ image, width, height }) => {
    const name = image.substring(11, image.length - 4);
    return (
        <>
            <div style={{ width: width + "px", height: height + "px", display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                <img src={image} alt={name} />
                <p>{name}</p>
            </div>
        </>
    );
}

MoleculeDisplay.propTypes = {
    image: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default MoleculeDisplay;
