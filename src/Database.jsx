import { useEffect, useState } from 'react';
import allMolecules from "./molecule_database";
import MoleculeDisplay from './MoleculeDisplay';
import getSuggestedMolecule from './GetSuggestedMolecule';
import Loading from './Loading';
import Header from './Header';
import Chart from './Chart';

const Database = ({socket}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        socket.on('updateImages', (updatedImages) => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000); //add loading screen for 2 seconds
            setSelectedImages(updatedImages);
        }, [selectedImages]); // Listen for changes in selectedImages
  
        return () => {
            // Cleanup function (e.g., removing event listeners)
            socket.off('updateImages');
        };
    }, [socket]); // Empty dependency array means this effect runs once when the component mounts

    //if a valid molecule is passed in
    if (selectedImages.length == 3 && selectedImages[0] != "src/assets/purple.png" && selectedImages[1] != "src/assets/green.png" && selectedImages[2] != "src/assets/blue.png") {
        if (loading) { //show loading screen while loading
            return (
                <>
                    <Loading />
                </>
            )
        } else {
            const data = getMoleculeProperties(selectedImages);

            //the graph display options
            const options = {
                title: "Molecule Properties & Statistics",
                width: 600,
                height: 400,
                bar: { groupWidth: "95%" },
                legend: { position: "none" },
                hAxis: {
                    minValue: 10,
                    },
            };

            const suggested = getSuggestedMolecule(selectedImages);

            if (suggested === true) {
                return displayWinningPage(selectedImages, data, options);
            } else if (suggested === false) {
                return displayInvalidPage(selectedImages, data, options);
            } else {
                return displaySuggestionPage(selectedImages, suggested, data, options);
            }
        }
    }
    // If there is no molecule selected or the molecule is invalid
    return (
        <>
            <Header />
            <div 
                style={{
                    display: 'flex', 
                    flexDirection: "row", 
                    margin: "0", backgroundColor: 
                    'white', justifyContent: 'center', 
                    height: '88vh', 
                    alignItems: 'center'
                }}
            >
                <h1>No molecule selected!</h1>
            </div>
        </>
    )
}

// Gets the data for the graph for the properties of the molecule
const getMoleculeProperties = (selectedImages) => {
     //get molecule information from the molecule list
     const molecules = selectedImages.map((image, i) => {
        return allMolecules[image];
    });
     const numMolecules = molecules.length;

     const weightSum = molecules.reduce((acc, currImage) => {return acc + currImage.weight}, 0);
     const lightAbsorptionSum = molecules.reduce((acc, currImage) => {return acc + currImage.light_absorption}, 0);
     const lifespanSum = molecules.reduce((acc, currImage) => {return acc + currImage.lifespan}, 0);
     const bandGapSum = molecules.reduce((acc, currImage) => {return acc + currImage.bandgap}, 0);

    return [weightSum/numMolecules, lightAbsorptionSum / numMolecules, lifespanSum / numMolecules, bandGapSum / numMolecules]
}

// Displays the page with the suggested molecules
const displaySuggestionPage = (selectedImages, suggested, data, options) => {
    return (
        <>
            <Header />
            <div style={{display: 'flex', flexDirection: "row", margin: "0", backgroundColor: 'white'}}>
                {/* Display the submitted molecule and its stats */}
                <div style={{flexDirection: "column", marginRight: "5rem"}}>
                    <h2 style={{padding: '1.5rem', color: 'black', fontVariant: 'small-caps'}}>
                        Your Selected Molecule:
                    </h2>
                    <span style={{
                        flexDirection: "row", 
                        display: 'flex', 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "2rem"}}>
                        {selectedImages.map((image, i) => (
                            <MoleculeDisplay key={i} image={image} width={200} height={150}></MoleculeDisplay>
                        ))}
                    </span>
                    <Chart 
                        weight={data[0]}
                        light_absorption={data[1]}
                        lifespan={data[2]}
                        bandgap={data[3]}
                    />
                </div>
                {/* Display the suggested molecules if the best molecule has not been found yet. */}
                <span>
                    <h2 style={{fontVariant: 'small-caps'}}>
                        Suggested Molecules:
                    </h2>
                    {suggested.map((suggestedTrimer, i) => (
                        <div key={i}>
                            <span style={{display: "flex", flexDirection: "row", padding: "1rem", alignItems: "center"}}>
                                {suggestedTrimer.map((image, j) => (
                                    <MoleculeDisplay key={j} image={image} width={'15rem'} height={'12rem'}></MoleculeDisplay>
                                ))}
                            </span>
                            <br />
                        </div>
                    ))}
                    <h2 style={{color: 'black'}}>
                        The molecule isn't optimized yet, keep submitting new molecules!
                    </h2>
                </span>
            </div>
        </>
    )
}

// Displayes the page when final molecule is submitted
const displayWinningPage = (selectedImages, data, options) => {
    return (
        <>
            <Header />
            <div style={{display: 'flex', flexDirection: "row", margin: "0", backgroundColor: 'white'}}>
                {/* Display the submitted molecule and its stats */}
                <div style={{flexDirection: "column", marginRight: "5rem"}}>
                    <h2 style={{padding: '1.5rem', fontVariant: 'small-caps'}}>
                        Your Selected Molecule:
                    </h2>
                    <span style={{
                        flexDirection: "row", 
                        display: 'flex', 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "2rem"}}>
                        {selectedImages.map((image, i) => (
                            <MoleculeDisplay key={i} image={image} width={200} height={150}></MoleculeDisplay>
                        ))}
                    </span>
                    <Chart 
                        weight={data[0]}
                        light_absorption={data[1]}
                        lifespan={data[2]}
                        bandgap={data[3]}
                    />
                </div>
                {/* If the best molecule has been found */}
                <span style={{marginRight: "10%"}}>
                    <h2 style={{fontVariant: 'small-caps'}}>
                        Suggested Molecules:
                    </h2>
                    <h1>Best molecule found! This molecule is ready to be synthesized using the physical molecule maker.</h1>
                </span>
            </div>
        </>
    )
}

const displayInvalidPage = (selectedImages, data, options) => {
    return (
        <>
            <Header />
            <div style={{display: 'flex', flexDirection: "row", margin: "0", backgroundColor: 'white'}}>
                {/* Display the submitted molecule and its stats */}
                <div style={{flexDirection: "column", marginRight: "5rem"}}>
                    <h2 style={{padding: '1.5rem', fontVariant: 'small-caps'}}>
                        Your Selected Molecule:
                    </h2>
                    <span style={{
                        flexDirection: "row", 
                        display: 'flex', 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "2rem"}}>
                        {selectedImages.map((image, i) => (
                            <MoleculeDisplay key={i} image={image} width={200} height={150}></MoleculeDisplay>
                        ))}
                    </span>
                    <Chart 
                        weight={data[0]}
                        light_absorption={data[1]}
                        lifespan={data[2]}
                        bandgap={data[3]}
                    />
                </div>
                {/* If the best molecule has been found */}
                <span style={{marginRight: "10%"}}>
                    <h2 style={{fontVariant: 'small-caps'}}>
                        Suggested Molecules:
                    </h2>
                    <h1>No suggested molecules for the selected molecule found. Try a different combination!</h1>
                </span>
            </div>
        </>
    )
}
  
export default Database;