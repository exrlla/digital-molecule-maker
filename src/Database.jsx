import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import { Chart } from "react-google-charts";

const Database = (p) => {
    const props = [{
        "filename": "src/assets/cat.jpg",
        "name": "c12h6",
        "color": "green",
        "weight": 1.02,
        "light_absorption": 8.1,
        "lifespan": 7.2,
        "bandgap": 3.4,
        "rank": "2"
    },
    {
        "filename": "src/assets/cat.jpg",
        "name": "c12h6",
        "color": "green",
        "weight": 1.02,
        "light_absorption": 8.4,
        "lifespan": 7.8,
        "bandgap": 3.1,
        "rank": "2"
    },
    {
        "filename": "src/assets/cat.jpg",
        "name": "c12h6",
        "color": "green",
        "weight": 1.02,
        "light_absorption": 8.5,
        "lifespan": 7.5,
        "bandgap": 3.1,
        "rank": "2"
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
        title: "Molecule Properties",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    return (
        <>
            <img src={props[0].filename} alt="logo" width={150} height={150} />
            <img src={props[1].filename} alt="logo" width={150} height={150} />
            <img src={props[2].filename} alt="logo" width={150} height={150} />

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
            <img src={props[3].filename} alt="logo"></img>
        </>
    )
}

export default Database;