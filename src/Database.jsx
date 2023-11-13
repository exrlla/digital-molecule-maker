import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Chart } from "react-google-charts";
import allMolecules from "./molecule_database";
// import io from 'socket.io-client';

const Database = ({socket}) => {
    // Receives the names of the molecules sent by maker
    const [selectedMolecules, setSelectedMolecules] = useState([]);
  
    useEffect(() => {
      socket.on('updateMolecules', (updatedMolecules) => {
         console.log("SOCKET DATABSE:", updatedMolecules)
         setSelectedMolecules(updatedMolecules);
      }, [selectedMolecules]); // Listen for changes in updatedMolecules
  
      return () => {
        // Cleanup function (e.g., removing event listeners)
        socket.off('updateMolecules');
      };
    }, [socket]); // Empty dependency array means this effect runs once when the component mounts

    // const getSuggestedMolecule = ([filename1, filename2, filename3]) => {
    //     const molecule1 = allMolecules[filename1];
    //     const molecule2 = allMolecules[filename2];
    //     const molecule3 = allMolecules[filename3];
    //     const incorrect_choices = [];
    
    //     if (molecule1.rank !== 4) {
    //         incorrect_choices.push(0);
    //     }
    //     if (molecule2.rank !== 4) {
    //         incorrect_choices.push(1);
    //     }
    //     if (molecule3.rank !== 4) {
    //         incorrect_choices.push(2);
    //     }
    //     if (incorrect_choices.length == 0) {
    //         return [["src/assets/C12H10N.png", "src/assets/C6H3F.png", "src/assets/C6H4NO2.png"],
    //                 ["src/assets/C12H10N.png", "src/assets/C6H3F.png", "src/assets/C6H4NO2.png"]]
    //     }

    //     const replace = incorrect_choices[0];
    //     var idx = -1;
    //     var idx2 = -1;
    //     var idx3 = -1;

    //     if (replace === 0) {
    //         idx = replace * 4 + molecule1.rank - 1;
    //         if (molecule1.rank == 1) {
    //             idx2 = idx + 1;
    //             idx3 = idx + 2;
    //         } else {
    //             idx2 = idx + 1;
    //             idx3 = idx - 1;
    //         }
    //         return [[Object.keys(allMolecules)[idx2], filename2, filename3],
    //                 [Object.keys(allMolecules)[idx3], filename2, filename3]];
    //     } else if (replace === 1) {
    //         idx = replace * 4 + molecule2.rank - 1;
    //         if (molecule2.rank == 1) {
    //             idx2 = idx + 1;
    //             idx3 = idx + 2;
    //         } else {
    //             idx2 = idx + 1;
    //             idx3 = idx - 1;
    //         }
    //         return [[filename1, Object.keys(allMolecules)[idx2], filename3],
    //                 [filename1, Object.keys(allMolecules)[idx3], filename3]];
    //     } else {
    //         idx = replace * 4 + molecule3.rank - 1;
    //         if (molecule3.rank == 1) {
    //             idx2 = idx + 1;
    //             idx3 = idx + 2;
    //         } else {
    //             idx2 = idx + 1;
    //             idx3 = idx - 1;
    //         }
    //         return [[filename1, filename2, Object.keys(allMolecules)[idx2]],
    //                 [filename1, filename2, Object.keys(allMolecules)[idx3]]];
    //     }
    // }

    if (selectedMolecules.length == 3 && selectedMolecules[0] != "purple" && selectedMolecules[1] != "green" && selectedMolecules[2] != "blue") {
        // First we get the objects for each block
        const molecules = getMoleculeTrimer(selectedMolecules);
        
        // Gets the data for the overall molecule
        const data = getCompleteMoleculeData(molecules);

        // Get the suggeted molecules
        const suggestedMoleculeNames = getSuggestedMoleculeNames(selectedMolecules);
        console.log(suggestedMoleculeNames);
        const suggested = suggestedMoleculeNames.map((recommendedMolecule) => {
            return getMoleculeTrimer(recommendedMolecule);
        })

        return displayDatabasePage(molecules, data, suggested)
    }

    return (
        <>
        <div>
            <h1>Database Page</h1>
            <div>
                <h2>Molecule is not valid</h2>
            </div>
        </div>
        </>
    )
}
//  TODO: find a better way to store molecule data to make this less slow. MMight not even matter hey who cares
const getAllRelevantMolecules = (rank, color) => {
    const filteredMolecules = Object.entries(allMolecules)
    .filter(([moleculeKey, molecule]) => molecule.rank === rank && molecule.color === color)
    .map(([moleculeKey, molecule]) => moleculeKey);

  return filteredMolecules;
}

const getSuggestedMoleculeNames = (selectedMolecules) => {
    const finalRank = 3;
    // This one is the objects for each molecule instead of just the names
    const moleculeTrimer = getMoleculeTrimer(selectedMolecules);

    const molecule1 = moleculeTrimer[0];
    const molecule2 = moleculeTrimer[1];
    const molecule3 = moleculeTrimer[2];

    // We first figure out which blocks aren't finalized,
    // that is, which blocks don't have the final molecule in its place
    const nonFinalSpaces = [];
    if (molecule1.rank != finalRank ) {
        nonFinalSpaces.push(0);
    }

    if (molecule2.rank != finalRank ) {
        nonFinalSpaces.push(1);
    }

    if (molecule3.rank != finalRank ) {
        nonFinalSpaces.push(2);
    }

    // Pick a random spot to improve on for the sake of the puzzle having variety every time you play it:
    const randomIndex = Math.floor(Math.random() * nonFinalSpaces.length);
    const toImproveSpot = nonFinalSpaces[randomIndex];
    const toImproveMolecule = moleculeTrimer[toImproveSpot];

    if (toImproveMolecule.isCorrectChoice) {
        // We chose in the maker the correct molecule compared to the others in that rank. so we move onto the
        // group of molecules in the next rank
        const choices = getAllRelevantMolecules(toImproveMolecule.rank + 1, toImproveMolecule.color);
        const recommendations = []
        choices.forEach((choice) => {
            const newTrimer = selectedMolecules;
            newTrimer[toImproveSpot] = choice;
            recommendations.push(newTrimer);
        })
        console.log("RECOMMENDATIONS", recommendations)
        return recommendations
    } else {
        // We failed to pick the correct molecule for the set we got recommended so let's display the choices again
        const choices = getAllRelevantMolecules(toImproveMolecule.rank, toImproveMolecule.color);
        const recommendations = []
        choices.forEach((choice) => {
            const newTrimer = selectedMolecules;
            newTrimer[toImproveSpot] = choice;
            recommendations.push(newTrimer);
        })
        console.log("RECOMMENDATIONS", recommendations)
        return recommendations
    }



    return [["C12H10N", "C6H3F", "C6H4NO2"],
        ["C12H10N", "C6H3F", "C6H4NO2"]]

}
// Takes in array of all molecules selected and returns data of averages for fully selected molecule
const getCompleteMoleculeData = (molecules) => {
    return [
        [
        "Property",
        "Scale",
        ],
        ["Weight", (molecules[0].weight + molecules[1].weight + molecules[2].weight) / 3.0],
        ["Light Absorption", (molecules[0].light_absorption + molecules[1].light_absorption + molecules[2].light_absorption) / 3.0],
        ["Lifespan", (molecules[0].lifespan + molecules[1].lifespan + molecules[2].lifespan) / 3.0],
        ["Band Gap", (molecules[0].bandgap + molecules[1].bandgap + molecules[2].bandgap) / 3.0]
    ];
}

const displayDatabasePage = (molecules, data, suggested) => {
    // Options for barchart
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

    return (
        <>
            <div style={{display: 'flex', flexDirection: "row", marginLeft: "3em", marginTop: "3em"}}>
                <span style={{width: 50 + "%"}}>
                    <img src={molecules[0].imagePath} title={molecules[0].name} alt="trimer 1" width={200} height={150} />
                    <img src={molecules[1].imagePath} title={molecules[1].name} alt="trimer 2" width={175} height={150} />
                    <img src={molecules[2].imagePath} title={molecules[2].name} alt="trimer 3" width={175} height={150} />

                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="500px"
                        data={data}
                        options={options}
                        style={{marginTop: 3 + 'em'}}
                    />
                </span>

                <span style={{width: 50 + "%"}}>
                    <h2>
                        Suggested Molecules:
                    </h2>
                    {suggested.map((suggestedTrimer, moleculeIndex) => (
                        <div key={moleculeIndex}>
                            <br />
                                <span>
                                    <img src={suggestedTrimer[0].imagePath} title={suggestedTrimer[0].name} width={200} height={150} alt="suggested molecule 1"></img>
                                    <img src={suggestedTrimer[1].imagePath} title={suggestedTrimer[1].name} width={175} height={150} alt="suggested molecule 2"></img>
                                    <img src={suggestedTrimer[2].imagePath} title={suggestedTrimer[2].name} width={175} height={150} alt="suggested molecule 3"></img>
                                </span>
                            <br />
                        </div>
                    ))}
                    Hover over a molecule component to see its name.
                </span>
            </div>
        </>
    )
}

// Takes in the names of the molecules and return array of the 3 objects
const getMoleculeTrimer = ([molecule1, molecule2, molecule3]) => {
    return [allMolecules[molecule1], allMolecules[molecule2], allMolecules[molecule3]]
}
  
export default Database;