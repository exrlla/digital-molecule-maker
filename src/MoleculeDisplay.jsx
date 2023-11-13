import PropTypes from 'prop-types';

const MoleculeDisplay = ({image, width, height}) => {
    const name = image.substring(11, image.length - 4);
    return (
        <>
            <div style={{width: width + "px", heigh: height + "px", display: 'flex', flexDirection: 'column', padding: '1rem'}}>
                <img src={image}/>
                <p>{name}</p>
            </div>
        </>
    );
}

export default MoleculeDisplay;