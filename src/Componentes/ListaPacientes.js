// src/componentes/ListaPacientes.js
import React from 'react';

const ListaPacientes = ({ pacientes }) => {
  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>{paciente.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPacientes;
