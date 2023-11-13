import './App.css'
import mmli from './assets/mmli.png'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import { useState } from 'react'
import allMolecules from './molecule_database'

const Maker = ({socket}) => {
  const [selectedMolecules, setSelectedMolecules] = useState(["purple", "green", "blue"]);
  
  const moleculesArr = Object.entries(allMolecules).map(([key, value]) => (
    {
      id: key,
      ...value,
    }
  ));
  
  const handleImageSelect = (moleculeKey) => {  
    const molecule = allMolecules[moleculeKey];
    const selectedMoleculeName = moleculeKey;
    if (molecule.color == "purple") {
      const newSelection = [selectedMoleculeName, selectedMolecules[1], selectedMolecules[2]];
      setSelectedMolecules(newSelection);
      socket.emit('imagesSelected', newSelection);
    } else if (molecule.color == "green") {
      const newSelection = [selectedMolecules[0], selectedMoleculeName, selectedMolecules[2]];
      setSelectedMolecules(newSelection)
      socket.emit('imagesSelected', newSelection);
    } else if (molecule.color == "blue") {
      const newSelection = [selectedMolecules[0], selectedMolecules[1], selectedMoleculeName];
      setSelectedMolecules(newSelection)
      socket.emit('imagesSelected', newSelection);
    }
  }

  return (
    <section className="maker-container">
        <img className='mmli-img'src={mmli} alt="mmli" />
    <div className="main-container">
      <Sidebar molecules={moleculesArr} handleImageSelect={handleImageSelect} selectedMolecules={selectedMolecules} />
      <MainContent selectedMolecules={selectedMolecules} />
    </div>
    </section>
  );
};
  
export default Maker;