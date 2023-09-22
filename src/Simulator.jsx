import React, { Component } from 'react';
import './App.css';
import './styles.css'; // Agrega esta línea
import { Link } from "react-router-dom"; // Cambia de useNavigate a Link
import FishSpecies from './FishSpecies';

class SimulatorSpecies extends Component {
  render() {
    return (
      <div className="App">
        <h1>Prototype Fish Tracker Experimental</h1>
        {/* Usar Link para navegar */}
        <Link to="/data">Ver registros</Link>
        <FishSpecies name="Megaptera novaeangliae" population={100} />
        <FishSpecies name="Orcinus orca" population={150} />
        <FishSpecies name="Delphinus delphis" population={80} />
      </div>
    );
  }
}

export default SimulatorSpecies;
