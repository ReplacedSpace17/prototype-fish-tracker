import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import backendUrl from './serverConfig';
import { useNavigate } from "react-router-dom";
import './table.css';

function Dashboard() {
    const Navegar = useNavigate();
  const [data, setData] = useState([]);
  
  const regresar = () => {
    Navegar("/Home");
  }
  useEffect(() => {
    // Realiza una solicitud para obtener los registros de la base de datos
    axios.get(`${backendUrl}/api/getTable`)
      .then(response => {
        setData(response.data); // Almacena los datos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los registros:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Muestra una confirmación antes de borrar el registro
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza una solicitud para borrar el registro
        axios.delete(`${backendUrl}/eliminar-registro/${id}`)
          .then(response => {
            if (response.status === 200) {
              // Actualiza la lista de registros después de borrar
              setData(data.filter(record => record.ID !== id));
              Swal.fire('Borrado', 'El registro ha sido eliminado', 'success');
            }
          })
          .catch(error => {
            console.error('Error al borrar el registro:', error);
          });
      }
    });
  };

  return (
    <div>
      <h1>Tabla de Registros de simulaciones</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Especie</th>
            <th>Generación</th>
            <th>Población</th>
            <th>Media</th>
            <th>DesvEst</th>
            <th>Mediana</th>
            <th>PoblacionMinima</th>
            <th>PoblacionMaxima</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr key={record.ID}>
              <td>{record.ID}</td>
              <td>{record.Especie}</td>
              <td>{record.Generacion}</td>
              <td>{record.Poblacion}</td>
              <td>{record.Media}</td>
              <td>{record.DesvEst}</td>
              <td>{record.Mediana}</td>
              <td>{record.PoblacionMinima}</td>
              <td>{record.PoblacionMaxima}</td>
              <td>
                <button onClick={() => handleDelete(record.ID)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={regresar}>Regresar</button>
      
    </div>
  );
}

export default Dashboard;
