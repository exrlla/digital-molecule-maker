import allMolecules from "./molecule_database";

// Returns true if player has found final molecule.
// Else:  Returns array of all (set of 3) molecules suggested to the player
// const GetSuggestedMolecule = ([filename1, filename2, filename3]) => {
//     console.log("getsuggested")
//     // gets the actual molecule information from the molecule list
//     const molecule1 = allMolecules[filename1];
//     const molecule2 = allMolecules[filename2];
//     const molecule3 = allMolecules[filename3];
//     var replace = -1;
    
//     // finds the first molecule that isn't fully optimized
//     if (molecule1.rank !== 4) {
//         replace = 0;
//     } else if (molecule2.rank !== 4) {
//         replace = 1;
//     } else if (molecule3.rank !== 4) {
//         replace = 2;
//     }
//     if (replace == -1) { //if the molecule is fully optimized, suggested molecules are the first molecule
//         return true;
//     }
//     var idx = -1;
//     var idx2 = -1;
//     var idx3 = -1;

//     if (replace === 0) {
//         idx = replace * 4 + molecule1.rank - 1; //get the index of the molecule in the molecule list
//         if (molecule1.rank == 1) { //edge case: if molecule is rank 1, then get rank 2 and rank 3 of the same color molecule
//             idx2 = idx + 1;
//             idx3 = idx + 2;
//         } else { //if the molecule is not rank 1, get the rank-1 and rank+1 molecule
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

// Things to note in database.jsx:
// In the database, we now, in addition to giving each molecule a rank they belong in,
// we also have a boolean flag that says whether that molecule "isCorrectChoice". "isCorrectChoice"
// is a flag that tells us that the molecule has the best features out of the others of that rank

// Algorithm
// This happens for molecules in the purple, green or blue spots the same
// (so let's assume we are talking about the purple spot just for sake of clarity)
// ...
// In the beginning purple molecule is selected by the player. This purple molecule has a rank (r).
// If the purple molecule is labeled as correct (isCorrectChoice = true), we return all the purple molecules that belong in the next rank (r+1) as suggestions.
// If the purple molecule is incorrect, we return all the purple molecules of the same rank r
// Keep in mind, only one purple molecule at each rank is labeled as correct.
// ...
// This algorithm happens for each spot. We choose randomly which spot (purple, green or blue) to show the suggestions for each time a player submits

// Example:
// purple molecule of rank 0 is selected. It has isCorrectChoice = true.
// player is then shown 3 purple molecules all of rank = 1 as suggestions. 
// player selects one of the suggestions. It has isCorrectChoice = false.
// Since that is not the best molecule from the suggestions the player is shown again all the molecules of rank = 1 as suggestions
// ... Player continues until the correct purple molecule of the last rank is chosen.
const GetSuggestedMolecule = (selectedImages) => {
    const finalRank = 2; //TODO
    // First we get the actual objects for our molecules
    const molecules = selectedImages.map((image, i) => {
        return allMolecules[image];
    });

    const molecule1 = molecules[0];
    const molecule2 = molecules[1];
    const molecule3 = molecules[2];

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
            // alert("You WON!");
            return true;
        } else {
            console.log("MESSED UPPP:", [molecule1, molecule2, molecule3])
            alert("Somehow messed up, the coder's fault");
        }
    }

    // Pick a random spot to improve on for the sake of the puzzle having variety every time you play it:
    const randomIndex = Math.floor(Math.random() * nonFinalSpaces.length);
    const toImproveSpot = nonFinalSpaces[randomIndex];
    const toImproveMolecule = molecules[toImproveSpot];

    if (toImproveMolecule.isCorrectChoice) {
        // We chose in the maker the correct molecule compared to the others in that rank. so we move onto the
        // group of molecules in the next rank
        const choices = getAllRelevantMolecules(toImproveMolecule.rank + 1, toImproveMolecule.color);
        const recommendations = []

        // For each of the recommended molecules we create a trimer that is the same as the clicked images except for the new molecule
        choices.forEach((choice) => {
            const newTrimer = [...selectedMolecules];
            newTrimer[toImproveSpot] = choice;
            recommendations.push(newTrimer);
        })
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
        return recommendations
    }
}

// Returns the images for all molecules that fit a rank and a color
const getAllRelevantMolecules = (rank, color) => {
    const filteredMolecules = Object.entries(allMolecules)
    .filter(([image, molecule]) => molecule.rank === rank && molecule.color === color)
    .map(([image, molecule]) => image);

  return filteredMolecules;
}

export default GetSuggestedMolecule;