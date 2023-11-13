import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Chart } from "react-google-charts";
import allMolecules from "./molecule_database";
import MoleculeDisplay from './MoleculeDisplay';
import Loading from './Loading';
// import io from 'socket.io-client';

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

    const getSuggestedMolecule = ([filename1, filename2, filename3]) => {
        // gets the actual molecule information from the molecule list
        const molecule1 = allMolecules[filename1];
        const molecule2 = allMolecules[filename2];
        const molecule3 = allMolecules[filename3];
        var replace = -1;
        
        // finds the first molecule that isn't fully optimized
        if (molecule1.rank !== 4) {
            replace = 0;
        } else if (molecule2.rank !== 4) {
            replace = 1;
        } else if (molecule3.rank !== 4) {
            replace = 2;
        }
        if (replace == -1) { //if the molecule is fully optimized, suggested molecules are the first molecule
            return [["src/assets/C12H10N.png", "src/assets/C6H3F.png", "src/assets/C6H4NO2.png"],
                    ["src/assets/C12H10N.png", "src/assets/C6H3F.png", "src/assets/C6H4NO2.png"]]
        }
        var idx = -1;
        var idx2 = -1;
        var idx3 = -1;

        if (replace === 0) {
            idx = replace * 4 + molecule1.rank - 1; //get the index of the molecule in the molecule list
            if (molecule1.rank == 1) { //edge case: if molecule is rank 1, then get rank 2 and rank 3 of the same color molecule
                idx2 = idx + 1;
                idx3 = idx + 2;
            } else { //if the molecule is not rank 1, get the rank-1 and rank+1 molecule
                idx2 = idx + 1;
                idx3 = idx - 1;
            }
            return [[Object.keys(allMolecules)[idx2], filename2, filename3],
                    [Object.keys(allMolecules)[idx3], filename2, filename3]];
        } else if (replace === 1) {
            idx = replace * 4 + molecule2.rank - 1;
            if (molecule2.rank == 1) {
                idx2 = idx + 1;
                idx3 = idx + 2;
            } else {
                idx2 = idx + 1;
                idx3 = idx - 1;
            }
            return [[filename1, Object.keys(allMolecules)[idx2], filename3],
                    [filename1, Object.keys(allMolecules)[idx3], filename3]];
        } else {
            idx = replace * 4 + molecule3.rank - 1;
            if (molecule3.rank == 1) {
                idx2 = idx + 1;
                idx3 = idx + 2;
            } else {
                idx2 = idx + 1;
                idx3 = idx - 1;
            }
            return [[filename1, filename2, Object.keys(allMolecules)[idx2]],
                    [filename1, filename2, Object.keys(allMolecules)[idx3]]];
        }
    }

    //if a valid molecule is passed in
    if (selectedImages.length == 3 && selectedImages[0] != "src/assets/purple.png" && selectedImages[1] != "src/assets/green.png" && selectedImages[2] != "src/assets/blue.png") {
        if (loading) { //show loading screen while loading
            return (
                <>
                    <Loading />
                </>
            )
        } else {
            //get molecule information from the molecule list
            const molecules = [allMolecules[selectedImages[0]], allMolecules[selectedImages[1]], allMolecules[selectedImages[2]]];

            //calculates the data by computing the average stats of the 3 molecules
            const data = [
                [
                "Property",
                "Scale",
                ],
                ["Weight", (molecules[0].weight + molecules[1].weight + molecules[2].weight) / 3.0],
                ["Light Absorption", (molecules[0].light_absorption + molecules[1].light_absorption + molecules[2].light_absorption) / 3.0],
                ["Lifespan", (molecules[0].lifespan + molecules[1].lifespan + molecules[2].lifespan) / 3.0],
                ["Band Gap", (molecules[0].bandgap + molecules[1].bandgap + molecules[2].bandgap) / 3.0]
            ];

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

            return (
                <>
                    <div style={{display: 'flex', flexDirection: "row", marginLeft: "3em", marginTop: "3em"}}>
                        {/* Display the submitted molecule and its stats */}
                        <div style={{flexDirection: "column", marginRight: "5rem"}}>
                            <span style={{
                                flexDirection: "row", 
                                display: 'flex', 
                                backgroundColor: "white",  
                                alignItems: "center", 
                                justifyContent: "center",
                                padding: "2rem"}}>
                                <MoleculeDisplay image={selectedImages[0]} width={200} height={150}></MoleculeDisplay>
                                <MoleculeDisplay image={selectedImages[1]} width={175} height={150}></MoleculeDisplay>
                                <MoleculeDisplay image={selectedImages[2]} width={175} height={150}></MoleculeDisplay>
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
                        {/* Display the suggested molecules. */}
                        <span>
                            <h2>
                                Suggested Molecules:
                            </h2>
                            <span style={{display: "flex", flexDirection: "row", backgroundColor: 'white', padding: "2rem", alignItems: "center"}}>
                                <MoleculeDisplay image={suggested[0][0]} width={200} height={150}></MoleculeDisplay>
                                <MoleculeDisplay image={suggested[0][1]} width={175} height={150}></MoleculeDisplay>
                                <MoleculeDisplay image={suggested[0][2]} width={175} height={150}></MoleculeDisplay>
                            </span>
                            <br />
                            <span style={{display: "flex", flexDirection: "row", backgroundColor: 'white', padding: "2rem", alignItems: "center"}}>
                                <MoleculeDisplay image={suggested[1][0]} width={200} height={150}></MoleculeDisplay>
                                <MoleculeDisplay image={suggested[1][1]} width={175} height={150}></MoleculeDisplay>
                                <MoleculeDisplay image={suggested[1][2]} width={175} height={150}></MoleculeDisplay>
                            </span>
                        </span>
                    </div>
                </>
            )
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
  
export default Database;