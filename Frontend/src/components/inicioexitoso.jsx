import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  InputBase,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,

  Divider
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send'; 
import logo from '../images/logo.png';
import '../styles/LoginExitoso.css';
import GroupDialog from './CreacionGrupo'; 
import PublicacionesPorCarrera from './publicacionesCarrera'; 
import CreacionHistoria from './CreacionHistoria';
import UserSettings from './AjustesUsuario'; 
import UserDetailDialog from './UserDetailDialog.jsx'; 
import fondoImagen from '../images/fondoexitoso.png';
import ChatComponent from './ChatComponent'; 
import SearchIcon from '@material-ui/icons/Search';


const LoginExitoso = ({ username, profileImage, onLogout }) => {
  const defaultImage = './images/ss.jpg';
  const [newPost, setNewPost] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenStory, setDialogOpenStory] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [careers, setCareers] = useState({}); 
  const [requestStatus, setRequestStatus] = useState({});
  const [posts, setPosts] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [userCareerId, setUserCareerId] = useState(null); 
  const [groups, setGroups] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false); 
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpenUser, setDialogOpenUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null); 
const [chatUser, setChatUser] = useState(null);
const [chatOpen, setChatOpen] = useState(false);



// Función para manejar la apertura del chat
const handleOpenChat = (user) => {
  setChatUser(user);
  setChatOpen(true);
};

  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setDialogOpenUser(true);
  };

  

  const handleSendMessage = () => {
    if (userId && newMessage.trim()) {
      fetch('http://192.168.100.4:5000/mensajes/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: userId,
          contenido: newMessage
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.message === 'Mensaje creado exitosamente') {
          // Obtén los mensajes actualizados
          fetch(`http://192.168.100.4:5000/mensajes/carrera/${userId}`)
            .then(response => response.json())
            .then(data => {
              if (data.result) {
                setMessages(data.data);
              } else {
                console.error('Error al obtener mensajes:', data.message);
              }
            })
            .catch(error => {
              console.error('Error al obtener mensajes:', error);
            });
  
          setNewMessage('');
          setSuccess('Mensaje creado exitosamente.');
          setError('');
        } else {
          setError(data.message || 'Error al enviar el mensaje.');
        }
      })
      .catch(error => {
        console.error('Error al comunicarse con el servidor:', error);
        setError('Error al comunicarse con el servidor.');
      });
    } else {
      setError('Por favor, escribe un mensaje antes de enviar.');
    }
  };
  
  useEffect(() => {
    fetch(`http://192.168.100.4:5000/mensajes/carrera/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setMessages(data.data);
          console.log('Messages data:', data.data); 
        } else {
          console.error('Error al obtener mensajes:', data.message);
        }
      })
      .catch(error => {
        console.error('Error al obtener mensajes:', error);
      });
  }, [userId]);
  
  const handleHomeClick = () => {
    window.location.reload(); 
  };
  useEffect(() => {
    fetch('http://192.168.100.4:5000/list/publicaciones')
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          const postList = data.data;
          const userIds = [...new Set(postList.map(post => post.id_usuario))];
  
          Promise.all(userIds.map(id =>
            fetch(`http://192.168.100.4:5000/api/usuarios/${id}`)
              .then(response => response.json())
              .then(userData => {
                if (userData && userData.result) {
                  return { id, nombre: userData.data.nombre };
                }
                return { id, nombre: 'Desconocido' };
              })
          ))
          .then(results => {
            const names = {};
            results.forEach(({ id, nombre }) => {
              names[id] = nombre;
            });
            console.log('User names:', names); // Asegúrate de que contiene todos los IDs necesarios
            setUserNames(names);
          })
          .catch(error => {
            console.error('Error al obtener nombres de usuarios:', error);
          });
  
          postList.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
          setPosts(postList);
        } else {
          setError('No se pudo obtener las publicaciones.');
        }
      })
      .catch(error => {
        setError('Error al comunicarse con el servidor.');
      });
  }, [posts]);
  
  
  
  
  useEffect(() => {
    fetch(`http://192.168.100.4:5000/usuario/id/${username}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          setUserId(data.data.user_id);
          setUserCareerId(data.data.id_carrera);
          setCurrentUserId(data.data.user_id); 
          setError('');
        } else {
          setError('No se pudo obtener el ID del usuario.');
        }
      })
      .catch(error => {
        setError('Error al comunicarse con el servidor.');
      });
  }, [username]);

  useEffect(() => {
    fetch('http://192.168.100.4:5000/usuario/list')
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          const filteredUsers = data.data.filter(user => user.id !== currentUserId);
          setUsersList(filteredUsers);
        } else {
          setError('No se pudo obtener la lista de usuarios.');
        }
      })
      .catch(error => {
        setError('Error al comunicarse con el servidor.');
      });
  
    fetch('http://192.168.100.4:5000/carreras/List')
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          const careersMap = data.data.reduce((map, career) => {
            map[career.id] = career.nombre;
            return map;
          }, {});
          setCareers(careersMap);
          setError('');
        } else {
          setError('No se pudo obtener la lista de carreras.');
        }
      })
      .catch(error => {
        setError('Error al comunicarse con el servidor.');
      });
  }, [currentUserId]);

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };


  const handlePostSubmit = () => {
    if (userId && newPost.trim()) {
      fetch('http://192.168.100.4:5000/publicacion/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: userId,
          contenido: newPost,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          setSuccess(data.message || 'Publicación exitosa.');
          setError('');
          setNewPost(''); 
        } else {
          setError(data.message || 'Error al guardar la publicación.');
          setSuccess('');
        }
      })
      .catch(error => {
        setError('Error al comunicarse con el servidor.');
        setSuccess('');
      });
    } else {
      setError('Por favor, escribe algo antes de publicar.');
      setSuccess('');
    }
  };
  
  


  const handleGroupDialogSubmit = async (name, description) => {
    if (userId && name.trim()) {
      const response = await fetch('http://192.168.100.4:5000/grupo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name,
          descripcion: description,
          id_creador: userId,
        }),
      });
      return response.json();
    } else {
      setError('Por favor, ingresa el nombre del grupo.');
      return { success: false, message: 'Nombre del grupo requerido' };
    }
  };


  
  useEffect(() => {
    const updatedRequestStatus = {};
    usersList.forEach(user => {
      const storedStatus = localStorage.getItem(`friendRequest_${user.id}`);
      if (storedStatus) {
        updatedRequestStatus[user.id] = storedStatus;
      }
    });
    setRequestStatus(updatedRequestStatus);
  }, [usersList]);
  
  useEffect(() => {
    const clearFriendRequests = () => {
      usersList.forEach(user => {
        localStorage.removeItem(`friendRequest_${user.id}`);
      });
      setRequestStatus({});
    };
  
    clearFriendRequests();
  }, [usersList]);
  

  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleCloseDialogStory = () => setDialogOpenStory(false);

  const handleHistoriaSubmit = (contenido, visibilidad) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: 'Historia creada exitosamente.' }), 1000);
    });
  };

  const [query, setQuery] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  
  const buscarPublicaciones = () => {
    fetch(`http://192.168.100.4:5000/api/publicaciones/buscar?palabra_clave=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setPublicaciones(data.data);
          const userIds = [...new Set(data.data.map(post => post.id_usuario))];
  
          Promise.all(userIds.map(id =>
            fetch(`http://192.168.100.4:5000/api/usuarios/${id}`)
              .then(response => response.json())
              .then(userData => {
                if (userData && userData.result) {
                  return { id, nombre: userData.data.nombre };
                }
                return { id, nombre: 'Desconocido' };
              })
          ))
          .then(results => {
            const names = {};
            results.forEach(({ id, nombre }) => {
              names[id] = nombre;
            });
            setUserNames(names);
          })
          .catch(error => {
            console.error('Error al obtener nombres de usuarios:', error);
          });
        } else {
          setPublicaciones([]);
          setError(data.message || 'No se encontraron publicaciones.');
        }
      })
      .catch(error => {
        console.error('Error al buscar publicaciones:', error);
        setError('Error al comunicarse con el servidor.');
      });
  };
  
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buscarPublicaciones();
    }
  };
  const [searchQuery, setSearchQuery] = useState('');

  const handleClearSearch = () => {
    setSearchQuery('');
    setPublicaciones([]);
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' , boxShadow : '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
      <AppBar position="static" className="appBar" style={{ backgroundColor: 'white', boxShadow: '0px 2px 4px -1px white' }}>
        <Toolbar style={{ width: '100%' }}>
          <img src={logo} alt="Logo UniEDU" className="logo" />
          <div className="search">
          <div className="searchIcon">
            <IconButton onClick={buscarPublicaciones}>
              <SearchIcon />
            </IconButton>
          </div>
          <InputBase
            placeholder="Busca una publicacion"
            classes={{
              root: 'inputRoot',
              input: 'inputInput',
              height: '20px',
              width: '20px'
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            />
            </div>
          <div style={{ flexGrow: 1 }} />
          <div className="welcome">
            <Avatar
              alt={username}
              src={profileImage || defaultImage}
              className="avatar"
              style={{ backgroundColor: '#8b0000', color: 'white' }}
            />
            <Typography variant="h6" style={{ color: '#000' }}>
              Bienvenido/a <b>{username}</b>! (ID: {userId || 'Cargando...'})
            </Typography>
          </div>
          
          <IconButton color="inherit" style={{ color: '#8b0000' }} onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
          
          <IconButton color="inherit" onClick={handleSettingsClick} >
              <SettingsIcon className="nav-icon" style={{ color: 'black' }}/>
            </IconButton>
          <IconButton color="inherit" onClick={onLogout} style={{ color: '#e40000' }}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <div> {publicaciones.length > 0 && (
          <Button variant="contained" color="secondary" onClick={handleClearSearch}>
            Cerrar Búsqueda
          </Button> )}
          </div>
          <div className="postsList">
  {publicaciones.length === 0 ? (
    <Typography variant="body1" style={{ color: 'black' }}> 
      <p style={{ color: 'white' }}>Busca alguna publicacion disponible, si no sale nada aqui es porque no hay publicaciones parecida!</p>
    </Typography>
  ) : (
    publicaciones.map((post, index) => (
      <Paper key={index} className="postItem">
        <div className="postContent">
          <div className="textContent">
            <Typography variant="body2" color="textSecondary">
              <b>{userNames[post.id_usuario] || 'Desconocido'}</b>
            </Typography>
            <Typography variant="body1">{post.contenido}</Typography>
          </div>
        </div>
      </Paper>
    ))
  )}
</div>
<Grid container spacing={3} style={{ marginTop: '20px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
      <Grid item xs={12} md={6} style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        <Paper elevation={3} className="seccion">
          <Typography variant="h6"><b>Crear Publicación</b></Typography>
          <Paper style={{ padding: '20px', marginTop: '50px' }}>
            <TextField
              multiline
              rows={10}  
              variant="outlined"
              fullWidth
              placeholder="Escribe algo interesante de tu carrera? Ven y comparte con los demás..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              style={{ marginBottom: '10px' }} 
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={handlePostSubmit}
            >
              Publicar
            </Button>
            {success && <Typography color="primary">{success}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
          </Paper>
        </Paper>
        <br />
        <Grid item xs={12}>
          <Paper
            style={{
              background: `url(${fondoImagen})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '250px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
    </Paper>
  </Grid>
          </Grid>
       
          <Grid item xs={12} md={6} style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
          <Paper elevation={3} className="seccion">
            <Typography variant="h6"> <b>Publicaciones generales</b></Typography>
            <Divider />
            <div className="postsList">
            {posts.length === 0 ? (
              <Typography variant="body1" color="textSecondary">No hay publicaciones.</Typography>
            ) : (
              posts.map((post, index) => (
                <Paper key={index} className="postItem">
                  <div className="postContent">
                    <Avatar style={{ marginRight: '10px', backgroundColor: '#761800' }}>
                      {userNames[post.id_usuario] ? userNames[post.id_usuario].charAt(0) : '?'}
                    </Avatar>
                    <div className="textContent">
                      <Typography variant="body2" color="textSecondary">
                        <b>{userNames[post.id_usuario] || 'Desconocido'}</b>
                      </Typography>
                      <Typography variant="body1" className="textContent">{post.contenido}</Typography>
                    </div>
                  </div>
                </Paper>
              ))
            )}
          </div>

          </Paper>
        </Grid>


          <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            
            <PublicacionesPorCarrera userId={userId} />
          </Paper>
        </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              
              <Grid item xs={6}>
                <Paper elevation={3} className="seccion">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Typography variant="h6"><b>Grupo de chat general de tu carrera </b>
                        </Typography>
                        
                    </div>
                    <Divider style={{ margin: '16px 0' }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
          <List>
          {messages.map((message, index) => (
    <React.Fragment key={index}>
      <ListItem style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ marginRight: '10px', backgroundColor: '#761800' }}>
            {userNames[message.id_usuario] ? userNames[message.id_usuario].charAt(0) : '?'}
          </Avatar>
          <ListItemText
            primary={message.contenido}
            secondary={`Usuario: ${userNames[message.id_usuario] ? `ID: ${message.id_usuario} - ${userNames[message.id_usuario]}` : `ID: ${message.id_usuario} - Not found in userNames`}`}
          />
        </div>
      </ListItem>
      {index < messages.length - 1 && <Divider />}
    </React.Fragment>
  ))}
        </List>
          </Paper>
        </Grid>
      </Grid>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        label="Nuevo mensaje"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSendMessage} color="primary">
              <SendIcon />
            </IconButton>
          ),
        }}
      />
            
          
        </Paper>
      </Grid>
      <Grid item xs={6}>
                <Paper elevation={3} className="seccion">
                  <Paper style={{ padding: '20px' }}>
                    <Typography variant="h6">Tablero de noticias - <b>NotiAlumniUG </b> : </Typography>
                    <List>
                    <p>*Se quiere implementar un chat privado</p>
                    <p>*Se quiere implementar la creacion de grupos</p>
                    <p>*Se quiere implementar la creacion de historias por tiempo determinados</p>
                    <p>*Se quiere implementar que el usuario pueda subir videos y fotos</p>
                  </List>
                  <p><b>AlumniUG, Te sigue informando de los futuros cambios en este tablero de reportes, Gracias por visitar nuestro sitio de red social estudiantil!</b></p>
                  </Paper>
                </Paper>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Container>
      <GroupDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={handleGroupDialogSubmit} />
     
      <CreacionHistoria
        open={dialogOpenStory}
        onClose={handleCloseDialogStory}
        onSubmit={handleHistoriaSubmit}
      />
      <UserSettings
    open={settingsOpen}
    onClose={handleCloseSettings}
    userId={userId}
/>
<UserDetailDialog
      open={dialogOpenUser}
      onClose={() => setDialogOpenUser(false)}
      user={selectedUser}
    />
    </Container>
  );
};

export default LoginExitoso;