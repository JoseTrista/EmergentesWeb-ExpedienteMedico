export const autenticarUsuario = async ({ usuario, contraseña }) => {
    // Simulación de autenticación
    if (usuario === 'medico' && contraseña === '1234') {
      return { rol: 'medico', token: 'fake-token' };
    } else if (usuario === 'paciente' && contraseña === '1234') {
      return { rol: 'paciente', token: 'fake-token' };
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };
  