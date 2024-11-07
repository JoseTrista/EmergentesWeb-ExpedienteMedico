import React, { useState, useEffect } from 'react';
import { cargarPacientes } from './Controladores/PacienteControlador';
import ListaPacientes from './Componentes/ListaPacientes';
import Login from './Componentes/Login';
import { autenticarUsuario } from './Controladores/AuthControlador';

const App = () => {
  const [pacientes, setPacientes] = useState([]);
  const [usuario, setUsuario] = useState(() => {
    // Verificar si hay una sesión guardada
    const tokenGuardado = localStorage.getItem('token');
    const rolGuardado = localStorage.getItem('rol');
    return tokenGuardado && rolGuardado ? { rol: rolGuardado, token: tokenGuardado } : null;
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (usuario && usuario.rol === 'medico') {
          setCargando(true);
          const datosPacientes = await cargarPacientes();
          setPacientes(datosPacientes);
        }
      } catch (err) {
        setError('Error al cargar los datos de pacientes');
        console.error('Error:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [usuario]);

  const manejarLogin = async (credenciales) => {
    try {
      const datosUsuario = await autenticarUsuario(credenciales);
      setUsuario(datosUsuario);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setUsuario(null);
    setPacientes([]);
    setError('');
  };

  const renderizarContenido = () => {
    if (cargando && usuario) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-blue-600">Cargando...</div>
        </div>
      );
    }

    if (!usuario) {
      return <Login onLogin={manejarLogin} />;
    }

    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">
            Bienvenido, {usuario.rol === 'medico' ? 'Doctor' : 'Paciente'}
          </h1>
          <button
            onClick={manejarLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {usuario.rol === 'medico' ? (
          <div className="bg-white p-4 rounded shadow-md">
            <ListaPacientes pacientes={pacientes} />
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl text-gray-700">Panel de Paciente</h2>
            {/* Aquí puedes agregar el contenido específico para pacientes */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {renderizarContenido()}
    </div>
  );
};

export default App;
