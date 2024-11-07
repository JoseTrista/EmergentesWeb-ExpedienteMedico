import { obtenerPacientes } from '../Modelos/PacienteModelo';

export const cargarPacientes = async () => {
  const pacientes = await obtenerPacientes();
  return pacientes;
};
