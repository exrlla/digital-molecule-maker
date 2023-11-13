import PropTypes from 'prop-types';

const MoleculeDisplay = ({image, width, height}) => {
    const name = image.substring(11, image.length - 4);
    return (
        <>
            <div style={{width: width, heigh: height, display: 'flex', flexDirection: 'column'}}>
                <img src={image}/>
                <p style={{marginTop: "2px"}}>{name}</p>
            </div>
        </>
    );
}

export default MoleculeDisplay;