// src/components/Login.js
import React, { useState } from 'react';

import './login.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios'; // Importa Axios
import backendUrl from './serverConfig';


function errorPassword() {
  Swal.fire({
    icon: 'error',
    title: 'Autenticación fallida',
    text: 'Las credenciales proporcionadas no coinciden para su acceso.',
    confirmButtonColor: '#4CAF50',
    confirmButtonText: 'Reintentar'
  })

}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      Usuario: email,
      Clave: password
    }

    try {
      const response = await axios.post(`${backendUrl}/api/login`, formData); // Reemplaza backendUrl con la URL correcta
      
      if (response.status === 200) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí
        navigate("/Home");
      }
      else{
        
      }
    } catch (error) {
      // Maneja los errores aquí
      console.error('Error en la solicitud:', error);
    }

  };

  return (
    <div className='body'>
      <div className="login-container">
        <h2 className="login-header">Iniciar sesión</h2>
        <form onSubmit={onSubmit}>

          <input id="inpt_Login" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="usuario" placeholder='Correo electrónico' />
          <input id="inpt_Login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder='Contraseña' />

          <button className='buttonLogin'>Iniciar Sesión</button>

        </form>
        <div className="login-links">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
