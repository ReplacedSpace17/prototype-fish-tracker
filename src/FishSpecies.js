import React, { Component } from 'react';
import { mean, standardDeviation } from 'simple-statistics';
import { Chart } from 'react-google-charts';

class FishSpecies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      population: props.population,
      populationHistory: [props.population],
      chartData: [['Tiempo', 'Población'], [0, props.population]],
    };
  }

  clone = () => {
    const { name, population } = this.state;
    return new FishSpecies({ name, population });
  };

  handleChange = (event) => {
    this.setState({ population: parseInt(event.target.value, 10) });
  };

  updatePopulation = (amount) => {
    this.setState((prevState) => ({
      population: Math.max(prevState.population + amount, 0),
    }));
  };

  simulateChange = () => {
    const growthRate = this.getRandomGrowthRate();
    const { population } = this.state;
    const newPopulation = Math.floor(population * growthRate);
    this.setState((prevState) => ({
      population: Math.max(newPopulation, 0),
      populationHistory: [...prevState.populationHistory, newPopulation],
      chartData: [
        ...prevState.chartData,
        [prevState.chartData.length, newPopulation],
      ],
    }));
  };

  getRandomGrowthRate = () => {
    const randomValue = Math.random();
    return randomValue < 0.5 ? 1.1 : 0.9; // 50% de probabilidad de crecimiento o decrecimiento
  };

  renderStatistics = () => {
    const { populationHistory } = this.state;
    const average = mean(populationHistory);
    const stdDev = standardDeviation(populationHistory);
    const maxPopulation = Math.max(...populationHistory);
    const minPopulation = Math.min(...populationHistory);
    const median = populationHistory.length % 2 === 0
      ? (populationHistory[populationHistory.length / 2 - 1] + populationHistory[populationHistory.length / 2]) / 2
      : populationHistory[Math.floor(populationHistory.length / 2)];
  
    return (
      <div className="statistics">
        <p>Promedio de población: {average.toFixed(2)}</p>
        <p>Desviación estándar: {stdDev.toFixed(2)}</p>
        <p>Población máxima: {maxPopulation}</p>
        <p>Población mínima: {minPopulation}</p>
        <p>Mediana de población: {median}</p>
      </div>
    );
  };
  

  render() {
    const { name, population, chartData } = this.state;

    return (
      <div className="fish-species">
        <h3>{name}</h3>
        <p>Población: {population}</p>
        <input
          type="number"
          value={population}
          onChange={this.handleChange}
        />
        <button onClick={this.simulateChange}>Simular Cambio</button>
        <button onClick={() => this.updatePopulation(1)}>Incrementar</button>
        <button onClick={() => this.updatePopulation(-1)}>Decrementar</button>
       
        <Chart
          width={'100%'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Cargando gráfico...</div>}
          data={chartData}
          options={{
            title: 'Historial de Población',
            hAxis: {
              title: 'Tiempo',
            },
            vAxis: {
              title: 'Población',
            },
          }}
        />
        {this.renderStatistics()}
      </div>
    );
  }
}

export default FishSpecies;
