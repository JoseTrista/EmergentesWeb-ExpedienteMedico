import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      await onLogin({ usuario, contraseña });
    } catch (err) {
      setError('Credenciales incorrectas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Paper elevation={3} style={{ width: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Iniciar Sesión
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={manejarSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={cargando}>
            {cargando ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Login;
