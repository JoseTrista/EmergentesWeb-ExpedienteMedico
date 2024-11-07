import './App.css';
import React, { useState, useEffect } from 'react';
import { cargarPacientes } from './Controladores/PacienteControlador';
import ListaPacientes from './Componentes/ListaPacientes';
import Login from './Componentes/Login';
import { autenticarUsuario } from './Controladores/AuthControlador';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const pacientes = await cargarPacientes();
      setPacientes(pacientes);
    };

    cargarDatos();
  }, []);

  const manejarLogin = async (credenciales) => {
    try {
      const userData = await autenticarUsuario(credenciales);
      setUsuario(userData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      {!usuario ? (
        <Login onLogin={manejarLogin} />
      ) : usuario.rol === 'medico' ? (
        <ListaPacientes pacientes={pacientes} />
      ) : (
        <div>Bienvenido, {usuario.rol}</div>
      )}
    </div>
  );
}

export default App;
