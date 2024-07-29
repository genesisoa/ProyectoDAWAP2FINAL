import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Link } from '@material-ui/core';
import fondoImagenInformacion from '../images/imagenInformacionInicio.jpg'; 

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/security/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_user: username, login_password: password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      await response.json();

      localStorage.setItem('username', username);

      setAuthError(null);

      // Notify parent component of successful login
      onLoginSuccess(username);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAuthError(error.message);
    }
  };

  const handleForgotPassword = () => {
    console.log('Redirigir al usuario a la página de recuperación de contraseña');
  };

  return (
    <Paper elevation={3} className="paper">
      <form onSubmit={handleSubmitLogin} >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nombre de Usuario"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ color: '#830400', marginBottom: '10px' }}
        >
          Ingresar
        </Button>
        
        {authError && <Typography variant="body2" color="error">{authError}</Typography>}
      </form>

      <img src={fondoImagenInformacion} alt="Imagen de Información" style={{ width: '100%', marginTop: '10px' }} />
    </Paper>
  );
};

export default LoginForm;
