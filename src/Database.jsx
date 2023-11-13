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


    if (selectedMolecules.length == 3 && selectedMolecules[0] != "purple" && selectedMolecules[1] != "green" && selectedMolecules[2] != "blue") {
        // First we get the objects for each block
        const molecules = getMoleculeTrimer(selectedMolecules);
        console.log("GETTRIMERR", molecules)
        // Gets the data for the overall molecule
        const data = getCompleteMoleculeData(molecules);
        console.log("COMPLETEMOLECULEDATA", molecules)
        // Get the suggeted molecules
        const suggestedMoleculeNames = getSuggestedMoleculeNames(selectedMolecules);
        console.log("SUGGESTED", molecules)
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
    const finalRank = 2; //TODO
    // This one is the objects for each molecule instead of just the names
    const moleculeTrimer = getMoleculeTrimer(selectedMolecules);

    const molecule1 = moleculeTrimer[0];
    const molecule2 = moleculeTrimer[1];
    const molecule3 = moleculeTrimer[2];

    // We give a new set of recommendations for a spot if the molecule in that spot
    // is not the correct choice for the options previously given (not correct choice for moving onto next rank)
    // or that molecule is the correct choice but it is not the final rank, so we give the recommendations for the next rank
    const nonFinalSpaces = [];
    if (!molecule1.isCorrectChoice || molecule1.rank != finalRank) {
        nonFinalSpaces.push(0);
    }

    if (!molecule2.isCorrectChoice || molecule2.rank != finalRank) {
        nonFinalSpaces.push(1);
    }

    if (!molecule3.isCorrectChoice || molecule3.rank != finalRank) {
        nonFinalSpaces.push(2);
    }

    // If all were correctly chosen then let's check if 
    if (nonFinalSpaces.length == 0) {
        if (molecule1.rank == finalRank && molecule2.rank == finalRank && molecule3.rank == finalRank) {
            alert("You WON!");
        } else {
            console.log("MESSED UPPP:", [molecule1, molecule2, molecule3])
            alert("Somehow messed up");
        }
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
            const newTrimer = [...selectedMolecules];
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
            const newTrimer = [...selectedMolecules];
            newTrimer[toImproveSpot] = choice;
            recommendations.push(newTrimer);
        })
        console.log("RECOMMENDATIONS", recommendations)
        return recommendations
    }
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

const displayDatabasePage = (moleculesChosen, data, suggested) => {
    console.log("MOLECULES SELECTED:", moleculesChosen)
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
                    <img src={moleculesChosen[0].imagePath} title={moleculesChosen[0].name} alt="trimer 1" width={200} height={150} />
                    <img src={moleculesChosen[1].imagePath} title={moleculesChosen[1].name} alt="trimer 2" width={175} height={150} />
                    <img src={moleculesChosen[2].imagePath} title={moleculesChosen[2].name} alt="trimer 3" width={175} height={150} />

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