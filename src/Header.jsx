import './App.css'
import icons from "./assets/icons.png"
import mmli from './assets/mmli.svg'
import { useEffect, useState } from 'react';

const Header = () => {
    return (
        <header 
            style={{
                display: 'flex', 
                flexDirection: 'row', 
                margin: 'none', 
                width: '100%', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                height: '7rem'
            }}
        >
            <img className='mmli-img'src={mmli} alt="mmli" height={80} style={{padding: '2rem'}}/>
            <h1 style={{display: 'flex', alignItems: 'center', fontSize: '2em'}}>
                Digitial Molecule Maker
            </h1>
            <img src={icons} alt="Icons" style={{paddingRight: '3rem', width: '6em', height: '3em'}}/>
        </header>
    )
}

export default Header;