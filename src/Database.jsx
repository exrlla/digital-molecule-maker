import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import { Chart } from "react-google-charts";

const Database = (p) => {
    const props = [{
        "filename": "src/assets/C20H12N.png",
        "name": "c20h12n",
        "weight": 3.5,
        "light_absorption": 3.8,
        "lifespan": 4.3,
        "bandgap": 7.5,
        "rank": 3
    },
    {
        "filename": "src/assets/C10H6.png",
        "name": "c10h6",
        "weight": 6.8,
        "light_absorption": 6.7,
        "lifespan": 3.7,
        "bandgap": 6.4,
        "rank": 2
    },
    {
        "filename": "src/assets/C4H3S.png",
        "name": "c4h3s",
        "weight": 7.9,
        "light_absorption": 5.4,
        "lifespan": 7.8,
        "bandgap": 5.6,
        "rank": 2
    },
    {
        "filename": "src/assets/react.svg"
    },
    {
        "filename": "src/assets/react.svg"
    }]

    const data = [
        [
          "Property",
          "Scale",
        ],
        ["Weight", (props[0].weight + props[1].weight + props[2].weight) / 3.0],
        ["Light Absorption", (props[0].light_absorption + props[1].light_absorption + props[2].light_absorption) / 3.0],
        ["Lifespan", (props[0].lifespan + props[1].lifespan + props[2].lifespan) / 3.0],
        ["Band Gap", (props[0].bandgap + props[1].bandgap + props[2].bandgap) / 3.0]
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

    return (
        <>
            <img src={props[0].filename} alt="trimer 1" width={200} height={150} />
            <img src={props[1].filename} alt="trimer 2" width={175} height={150} />
            <img src={props[2].filename} alt="trimer 3" width={175} height={150} />

            <Chart
                chartType="BarChart"
                width="100%"
                height="500px"
                data={data}
                options={options}
            />
            <h2>
                Suggested Molecules
            </h2>
            <img src={props[3].filename} alt="suggested moelcule 1"></img>
            <img src={props[4].filename} alt="suggested molecule 2"></img>
        </>
    )
}

export default Database;