import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import { Chart } from "react-google-charts";

const Database = (p) => {
    const getSuggestedMolecule = ([filename1, filename2, filename3]) => {
        const molecule1 = allMolecules[filename1];
        const molecule2 = allMolecules[filename2];
        const molecule3 = allMolecules[filename3];
        const incorrect_choices = [];
    
        if (molecule1.rank !== 4) {
            incorrect_choices.push(0);
        }
        if (molecule2.rank !== 4) {
            incorrect_choices.push(1);
        }
        if (molecule3.rank !== 4) {
            incorrect_choices.push(2);
        }
        if (incorrect_choices.length == 0) {
            return [["src/assets/C12H10N.png", "src/assets/C6H3F.png", "src/assets/C6H4NO2.png"],
                    ["src/assets/C12H10N.png", "src/assets/C6H3F.png", "src/assets/C6H4NO2.png"]]
        }

        const replace = incorrect_choices[0];
        var idx = -1;
        var idx2 = -1;
        var idx3 = -1;

        if (replace === 0) {
            idx = replace * 4 + molecule1.rank - 1;
            if (molecule1.rank == 1) {
                idx2 = idx + 1;
                idx3 = idx + 2;
            } else {
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
    
    const allMolecules = {
        "src/assets/C12H10N.png": {    
            "name": "c12h10n",
            "color": "purple",
            "weight": 1.3,
            "light_absorption": 3.6,
            "lifespan": 1.8,
            "bandgap": 4.5,
            "rank": 1
        },
        "src/assets/C14H14N.png": {
            "name": "c14h14n",
            "color": "purple",
            "weight": 5.6,
            "light_absorption": 3.7,
            "lifespan": 3.7,
            "bandgap": 5.7,
            "rank": 2
        },
        "src/assets/C20H12N.png": {
            "name": "c20h12n",
            "color": "purple",
            "weight": 3.5,
            "light_absorption": 3.8,
            "lifespan": 4.3,
            "bandgap": 7.5,
            "rank": 3
        },
        "src/assets/C12H8N.png": {
            "name": "c12h8n",
            "color": "purple",
            "weight": 5.7,
            "light_absorption": 3.9,
            "lifespan": 6.8,
            "bandgap": 8.7,
            "rank": 4
        },
        "src/assets/C6H3F.png": {
            "name": "c6h3f",
            "color": "green",
            "weight": 2.6,
            "light_absorption": 5.8,
            "lifespan": 3.4,
            "bandgap": 3.6,
            "rank": 1
        },
        "src/assets/C10H6.png": {
            "name": "c10h6",
            "color": "green",
            "weight": 6.8,
            "light_absorption": 6.7,
            "lifespan": 3.7,
            "bandgap": 6.4,
            "rank": 2
        },
        "src/assets/C8H6.png": {
            "name": "c8h6",
            "color": "green",
            "weight": 3.9,
            "light_absorption": 6.9,
            "lifespan": 6.7,
            "bandgap": 6.5,
            "rank": 3
        },
        "src/assets/C6H4.png": {
            "name": "c6h4",
            "color": "green",
            "weight": 4.1,
            "light_absorption": 7.8,
            "lifespan": 8.9,
            "bandgap": 7.9,
            "rank": 4
        },
        "src/assets/C6H4NO2.png": {
            "name": "c6h4no2",
            "color": "blue",
            "weight": 4.6,
            "light_absorption": 3.4,
            "lifespan": 5.6,
            "bandgap": 4.5,
            "rank": 1
        }, 
        "src/assets/C4H3S.png": {
            "name": "c4h3s",
            "color": "blue",
            "weight": 7.9,
            "light_absorption": 5.4,
            "lifespan": 7.8,
            "bandgap": 5.6,
            "rank": 2
        },
        "src/assets/C7H4N.png": {
            "name": "c7h4n",
            "color": "blue",
            "weight": 10.0,
            "light_absorption": 6.7,
            "lifespan": 7.9,
            "bandgap": 6.8,
            "rank": 3
        },
        "src/assets/C4H3N2.png": {
            "name": "c4h3n2",
            "color": "blue",
            "weight": 3.4,
            "light_absorption": 6.8,
            "lifespan": 9.8,
            "bandgap": 8.1,
            "rank": 4
        }
    }
    const props = ["src/assets/C12H8N.png", "src/assets/C6H4.png", "src/assets/C4H3N2.png"]
    const molecules = [allMolecules[props[0]], allMolecules[props[1]], allMolecules[props[2]]]

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

    const suggested = getSuggestedMolecule(props);
    console.log(suggested);

    return (
        <>
            <div style={{display: 'flex', flexDirection: "row", marginLeft: "3em", marginTop: "3em"}}>
                <span style={{width: 50 + "%"}}>
                    <img src={props[0]} title={props[0].substring(11, props[0].length - 4)} alt="trimer 1" width={200} height={150} />
                    <img src={props[1]} title={props[0].substring(11, props[1].length - 4)} alt="trimer 2" width={175} height={150} />
                    <img src={props[2]} title={props[0].substring(11, props[2].length - 4)} alt="trimer 3" width={175} height={150} />

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
                    <span>
                        <img src={suggested[0][0]} title={suggested[0][0].substring(11, suggested[0][0].length - 4)} width={200} height={150} alt="suggested molecule 1"></img>
                        <img src={suggested[0][1]} title={suggested[0][1].substring(11, suggested[0][1].length - 4)} width={175} height={150} alt="suggested molecule 2"></img>
                        <img src={suggested[0][2]} title={suggested[0][2].substring(11, suggested[0][2].length - 4)} width={175} height={150} alt="suggested molecule 3"></img>
                    </span>
                    <br />
                    <span>
                        <img src={suggested[1][0]} title={suggested[1][0].substring(11, suggested[1][0].length - 4)} width={200} height={150} alt="suggested molecule 1"></img>
                        <img src={suggested[1][1]} title={suggested[1][1].substring(11, suggested[1][1].length - 4)} width={175} height={150} alt="suggested molecule 2"></img>
                        <img src={suggested[1][2]} title={suggested[1][2].substring(11, suggested[1][2].length - 4)} width={175} height={150} alt="suggested molecule 3"></img>
                    </span>
                    <br />
                    Hover over a molecule component to see its name.
                </span>
            </div>

        </>
    )
}

export default Database;

