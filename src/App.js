import React, { Component } from 'react';
import './App.css';
import './styles.css'; // Agrega esta línea

import FishSpecies from './FishSpecies';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Prototype Fish Tracker</h1>
        <FishSpecies name="Salmón" population={100} />
        <FishSpecies name="Atún" population={150} />
        <FishSpecies name="Bacalao" population={80} />
      </div>
    );
  }
}

export default App;
