import React, { Component } from 'react';
import { mean, standardDeviation } from 'simple-statistics';
import { Chart } from 'react-google-charts';
import Swal from 'sweetalert2'
import axios from 'axios'; // Importa Axios
import backendUrl from './serverConfig';
import { useNavigate } from "react-router-dom";

let poblacion, promedio, desv, min, max, mediana, generacion, especie;

const Guardar = async (event) => {
  event.preventDefault();
  const formData = {
    Especie: especie,
    Generacion: generacion,
    Poblacion: poblacion,
    Media: promedio,
    DesvEst: desv,
    Mediana: mediana,
    PoblacionMinima: min,
    PoblacionMaxima: max,
  }

  try {
    const response = await axios.post(`${backendUrl}/newSimulationInsert`, formData); // Reemplaza backendUrl con la URL correcta

    if (response.status === 201) {
      // La solicitud fue exitosa, puedes manejar la respuesta aquí
      //almacenar en bd
      Swal.fire(
        'Agregado',
        'Se ha guardado la simulación' 

      )
    }
    else {

    }
  } catch (error) {
    // Maneja los errores aquí
    console.error('Error en la solicitud:', error);
  }

}
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

    //guardar valores a la bd

    poblacion = newPopulation;
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

    promedio = average.toFixed(2);
    desv = stdDev.toFixed(2);
    max = maxPopulation;
    min = minPopulation;
    mediana = median;
    var datoGen = String(populationHistory);
    datoGen = datoGen.split(",");
    generacion = datoGen.length;
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
    especie = name;
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
        <button onClick={Guardar}>Guardar valores</button>

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
