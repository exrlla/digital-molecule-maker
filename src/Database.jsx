import './App.css'
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import { Chart } from "react-google-charts";

const Database = (p) => {
    const props = [{
        "filename": "cat.jpg",
        "name": "c12h6",
        "color": "green",
        "weight": 1.02,
        "light_absorption": 8.1,
        "lifespan": 7.2,
        "bandgap": 3.4,
        "rank": "2"
    },
    {
        "filename": "cat.jpg",
        "name": "c12h6",
        "color": "green",
        "weight": 1.02,
        "light_absorption": 8.4,
        "lifespan": 7.8,
        "bandgap": 3.1,
        "rank": "2"
    },
    {
        "filename": "cat.jpg",
        "name": "c12h6",
        "color": "green",
        "weight": 1.02,
        "light_absorption": 8.5,
        "lifespan": 7.5,
        "bandgap": 3.1,
        "rank": "2"
    }]

    const data = [
        [
          "Property",
          "Scale",
        ],
    ];
    const newWeight = (props[0].weight + props[1].weight + props[2].weight) / 3.0;
    const newLightAbsorption = (props[0].light_absorption + props[1].light_absorption + props[2].light_absorption) / 3.0;
    const newLifespan = (props[0].lifespan + props[1].lifespan + props[2].lifespan) / 3.0;
    const newBandGap = (props[0].bandgap + props[1].bandgap + props[2].bandgap) / 3.0;
    data.push(["Weight", newWeight]);
    data.push(["Light Absorption", newLightAbsorption]);
    data.push(["Lifespan", newLifespan]);
    data.push(["Band Gap", newBandGap]);

    const options = {
        title: "Molecule Properties",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    return (
        <>
            <img src={props[0].filename} alt="logo" />
            <img src="./cat.jpg" alt="logo" />
            <img src="./cat.jpg" alt="logo" />

            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </>
    )
}

export default Database;