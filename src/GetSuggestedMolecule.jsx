import allMolecules from "./molecule_database";

const GetSuggestedMolecule = ([filename1, filename2, filename3]) => {
    console.log("getsuggested")
    // gets the actual molecule information from the molecule list
    const molecule1 = allMolecules[filename1];
    const molecule2 = allMolecules[filename2];
    const molecule3 = allMolecules[filename3];
    if (molecule1.rank == -1 || molecule2.rank == -1 || molecule3.rank == -1) {
        return false;
    }
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
        return true;
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

export default GetSuggestedMolecule;