import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Divider,
} from '@mui/material';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    onLogin({ usuario, contraseña });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '400px',
        margin: '50px auto',
        padding: '30px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LocalHospitalOutlinedIcon sx={{ fontSize: 40, color: '#1976d2', marginBottom: '10px' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Hospital Mayab
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Ingrese sus credenciales para acceder al sistema
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px', marginBottom: '20px' }}>
          Médico: usuario="medico", contraseña="1234"<br />
          Paciente: usuario="paciente", contraseña="1234"
        </Typography>
      </Box>
      <form onSubmit={manejarSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar Sesión
          </Button>
        </Box>
      </form>
      <Link href="#" variant="body2" sx={{ display: 'block', marginTop: '15px' }}>
        ¿Olvidó su contraseña?
      </Link>
      <Divider sx={{ marginTop: '20px' }} />
      <Typography variant="caption" color="textSecondary" sx={{ marginTop: '10px' }}>
        © 2024 Hospital Mayab. Todos los derechos reservados.
      </Typography>
    </Paper>
  );
};

export default Login;
