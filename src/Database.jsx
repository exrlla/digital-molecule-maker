import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import allMolecules from "./molecule_database";
import MoleculeDisplay from './MoleculeDisplay';
import getSuggestedMolecule from './GetSuggestedMolecule';
import Loading from './Loading';

const Database = ({socket}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        socket.on('updateImages', (updatedImages) => {
            setLoading(true);
            setTimeout(() => setLoading(false), 5000); //add loading screen for 5 seconds
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
            <div style={{alignContent: "center", justifyContent: "center", alignSelf: "center", display: "flex", marginTop: "10%"}}>
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
     const lightAbsorptionSum = molecules.reduce((acc, currImage) => {return acc + currImage.reactivity}, 0);
     const lifespanSum = molecules.reduce((acc, currImage) => {return acc + currImage.activation_energy}, 0);
     const bandGapSum = molecules.reduce((acc, currImage) => {return acc + currImage.bandgap}, 0);
     
     //calculates the data by computing the average stats of the 3 molecules
     const data = [
         [
         "Property",
         "Scale",
         ],
         ["Weight", weightSum / numMolecules],
         ["Reactivity", lightAbsorptionSum / numMolecules],
         ["Activation Energy", lifespanSum / numMolecules],
         ["Band Gap", bandGapSum / numMolecules]
     ];

     return data;
}

// Displays the page with the suggested molecules
const displaySuggestionPage = (selectedImages, suggested, data, options) => {
    return (
        <>
            <div style={{display: 'flex', flexDirection: "row", margin: "3em", backgroundColor: 'white'}}>
                {/* Display the submitted molecule and its stats */}
                <div style={{flexDirection: "column", marginRight: "5rem"}}>
                    <h2 style={{backgroundColor: 'white', padding: '1.5rem', color: 'black'}}>
                        Your Selected Molecule:
                    </h2>
                    <span style={{
                        flexDirection: "row", 
                        display: 'flex', 
                        backgroundColor: "white",  
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "2rem"}}>
                        {selectedImages.map((image, i) => (
                            <MoleculeDisplay image={image} width={200} height={150}></MoleculeDisplay>
                        ))}
                    </span>
                    <Chart
                            chartType="BarChart"
                            width="100%"
                            height="500px"
                            data={data}
                            options={options}
                            style={{marginTop: 3 + 'em'}}
                    />
                </div>
                {/* Display the suggested molecules if the best molecule has not been found yet. */}
                <span>
                    <h2>
                        Suggested Molecules:
                    </h2>
                    {suggested.map((suggestedTrimer, i) => (
                        <div key={i}>
                            <span style={{display: "flex", flexDirection: "row", backgroundColor: 'white', padding: "1rem", alignItems: "center"}}>
                                {suggestedTrimer.map((image, j) => (
                                    <MoleculeDisplay image={image} width={200} height={150}></MoleculeDisplay>
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
            <div style={{display: 'flex', flexDirection: "row", margin: "3em", marginTop: '3em', backgroundColor: 'white'}}>
                {/* Display the submitted molecule and its stats */}
                <div style={{flexDirection: "column", marginRight: "5rem"}}>
                    <h2 style={{backgroundColor: 'white', padding: '1.5rem'}}>
                        Your Selected Molecule:
                    </h2>
                    <span style={{
                        flexDirection: "row", 
                        display: 'flex', 
                        backgroundColor: "white",  
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "2rem"}}>
                        {selectedImages.map((image, i) => (
                            <MoleculeDisplay image={image} width={200} height={150}></MoleculeDisplay>
                        ))}
                    </span>
                    <Chart
                            chartType="BarChart"
                            width="100%"
                            height="500px"
                            data={data}
                            options={options}
                            style={{marginTop: 3 + 'em'}}
                    />
                </div>
                {/* If the best molecule has been found */}
                <span style={{marginRight: "10%"}}>
                    <h2>
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
            <div style={{display: 'flex', flexDirection: "row", margin: "3em", backgroundColor: 'white'}}>
                {/* Display the submitted molecule and its stats */}
                <div style={{flexDirection: "column", marginRight: "5rem"}}>
                    <h2 style={{backgroundColor: 'white', padding: '1.5rem'}}>
                        Your Selected Molecule:
                    </h2>
                    <span style={{
                        flexDirection: "row", 
                        display: 'flex', 
                        backgroundColor: "white",  
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "2rem"}}>
                        {selectedImages.map((image, i) => (
                            <MoleculeDisplay image={image} width={200} height={150}></MoleculeDisplay>
                        ))}
                    </span>
                </div>
                {/* If the best molecule has been found */}
                <span style={{marginRight: "10%"}}>
                    <h2>
                        Suggested Molecules:
                    </h2>
                    <h1>No suggested molecules for the selected molecule found. Try again!</h1>
                </span>
            </div>
        </>
    )
}
  
export default Database;