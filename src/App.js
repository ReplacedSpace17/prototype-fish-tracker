import React, { Component } from 'react';
import './App.css';
import './styles.css'; // Agrega esta línea

import FishSpecies from './FishSpecies';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Prototype Fish Tracker Experimental</h1>
        <FishSpecies name="Salmo" population={100} />
        <FishSpecies name="Thunnus thynnus" population={150} />
        <FishSpecies name="Gadus morhua" population={80} />
      </div>
    );
  }
}

export default App;
