import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, Typography, Tabs, Tab } from '@material-ui/core';
import RegistroForm from './registro_component';
import LoginForm from './login_component';
import LoginExitoso from './inicioexitoso'; 
import '../styles/loginprincipal.css';
import '../styles/registroprincipal.css';
import informacion from '../images/imagenInicio.png';
import logouni from '../images/logo.png';
import fondoImagen from '../images/fondocuaderno.png';
import fondoImagenInformacion from '../images/fondocuadernoimformacion.png';
const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [carreras, setCarreras] = useState([]);
  const [username, setUsername] = useState('');
  const [registroUsuario, setRegistroUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    usuario: '',
    fecha_nacimiento: '',
    biografia: '',
    id_carrera: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const obtenerCarreras = async () => {
    try {
      const response = await fetch('http://localhost:5000/carreras/List');
      if (!response.ok) {
        throw new Error('Error al obtener las carreras');
      }
      const data = await response.json();
      setCarreras(data.data);
    } catch (error) {
      console.error('Error al obtener las carreras:', error);
    }
  };

  useEffect(() => {
    obtenerCarreras();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTabChange = (index) => {
    setTabValue(index);
  };

  const handleCarreraChange = (event) => {
    setRegistroUsuario({
      ...registroUsuario,
      id_carrera: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistroUsuario({
      ...registroUsuario,
      [name]: value,
    });
  };

  const handleSubmitRegistro = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/usuarios/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registroUsuario,
          foto_perfil: 'default.jpg'  
        }),
      });
      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }
      const data = await response.json();
      alert(data.message); 
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleLoginSuccess = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); 
    setIsLoggedIn(false);
    setUsername('');
    setTabValue(0);
  };

  if (isLoggedIn) {
    return <LoginExitoso username={username} onLogout={handleLogout} />;
  }

  return (
    <div className='root'>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} className="welcome-container">
            <div className="welcome-content">
              <img src={logouni} alt="Logo UniEDU" className="welcome-logo" />
              <div className="welcome-text">
              <Typography variant="h5" gutterBottom style={{ color: 'black' }}>
              ¡Bienvenido a <b> Alumni<span style={{ color: '#FF0000' }}>UG</span> </b>!
            </Typography>

                <p></p>
                <Typography variant="body1" gutterBottomn style={{ color: '#390200' }}>
                  Una red social que podrás interactuar con otros estudiantes de tu carrera o otras que tengas curiosidad aprender.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className="ContenedorImagenInformacion" style={{ background: `url(${fondoImagenInformacion})`,  
          backgroundSize: 'cover',            
          backgroundRepeat: 'no-repeat',      
          backgroundPosition: 'center',       
          backgroundColor: '#ffffff20',}} > 
            <Paper elevation={3} className="imagenInformacion" style={{ background: '#ffffff7a' }}>
              <h1 style={{ color: '#390200' ,  fontFamily: 'Italic'}}>¿Por qué un buho nos representa?</h1>
              <img
                src={informacion}
                alt="Imagen de bienvenida"
                className="welcome-image"
              />
              <p>Si tienes problemas tecnicos o olvido de credenciales, comunicate con: sonoal285@gmail.com </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}className="ContenedorLoginRegistroInformacion" style={{ background: `url(${fondoImagen})`,  
            backgroundSize: 'cover',            
            backgroundRepeat: 'no-repeat',      
            backgroundPosition: 'center',       
            backgroundColor: '#ffffff7a',}}>
            <Grid container spacing={2} justifyContent="center"  >
              <Grid item xs={12} >
                <Paper elevation={3} className="paper-container" style={{ boxShadow: '2px 2px 2px rgba(142, 40, 36, 0.5)' }} >
                  <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="Iniciar Sesión" onClick={() => handleTabChange(0)}  style={{ color: '#761800' }}/>
                    <Tab label="Registrarse" onClick={() => handleTabChange(1)} style={{ color: '#761800' }} />
                  </Tabs>
                  <Grid container justifyContent="center"  >
                    <Grid item xs={10}>
                      {tabValue === 0 && (
                        <LoginForm onLoginSuccess={handleLoginSuccess}  />
                      )}
                      {tabValue === 1 && (
                        <RegistroForm
                          handleSubmitRegistro={handleSubmitRegistro}
                          registroUsuario={registroUsuario}
                          handleInputChange={handleInputChange}
                          handleCarreraChange={handleCarreraChange}
                          carreras={carreras}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
