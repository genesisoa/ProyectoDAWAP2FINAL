import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import Alert from '@mui/material/Alert';

const UserSettings = ({ open, onClose, userId }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    nuevaContrasena: '',
    fecha_nacimiento: '',
    biografia: '',
    usuario: '',
    id_carrera: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [contrasenaExistente, setContrasenaExistente] = useState('');
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
  const [careers, setCareers] = useState({});
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      fetch(`http://192.168.100.4:5000/api/Litsausuarios/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.result) {
            setUserData({
              nombre: data.data.nombre || '',
              apellido: data.data.apellido || '',
              correo: data.data.correo || '',
              nuevaContrasena: '',
              fecha_nacimiento: data.data.fecha_nacimiento || '',
              biografia: data.data.biografia || '',
              usuario: data.data.usuario || '',
              id_carrera: data.data.id_carrera || '',
            });
            setContrasenaExistente(data.data.contrasena || '');
          } else {
            setError(data.message || 'Error al obtener los datos del usuario.');
          }
          setLoading(false);
        })
        .catch((error) => {
          setError('Error al comunicarse con el servidor.');
          setLoading(false);
        });
    }
  }, [userId, open]);

  useEffect(() => {
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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setShowPasswordDialog(true);
  };

  const handlePasswordConfirm = () => {
    if (enteredPassword !== contrasenaExistente) {
      setAlert({ open: true, severity: 'error', message: 'La contraseña actual no coincide.' });
      return;
    }

    const updatedData = { ...userData };
    if (!userData.nuevaContrasena) {
      updatedData.contrasena = contrasenaExistente; // Use existing password if new password is not provided
    } else {
      updatedData.contrasena = userData.nuevaContrasena; // Use new password if provided
    }

    fetch(`http://192.168.100.4:5000/usuario/actualizar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario: userId, ...updatedData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          setAlert({ open: true, severity: 'success', message: 'Datos actualizados exitosamente. Actualice la página para ver cambios.' });
        } else {
          setAlert({ open: true, severity: 'error', message: data.message || 'Error al actualizar los datos del usuario.' });
        }
      })
      .catch((error) => {
        setAlert({ open: true, severity: 'error', message: 'Error al comunicarse con el servidor.' });
      })
      .finally(() => {
        setShowPasswordDialog(false);
        setEnteredPassword('');
      });
  };

  const handleDeactivateAccount = () => {
    setConfirmDeactivate(true);
  };

  const handleDeactivateConfirm = () => {
    fetch(`http://192.168.100.4:5000/usuario/actualizarEstado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          setAlert({ open: true, severity: 'success', message: 'Cuenta desactivada exitosamente.' });
          onClose(); 
        } else {
          setAlert({ open: true, severity: 'error', message: data.message || 'Error al desactivar la cuenta.' });
        }
      })
      .catch((error) => {
        setAlert({ open: true, severity: 'error', message: 'Error al comunicarse con el servidor.' });
      })
      .finally(() => {
        setConfirmDeactivate(false);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Ajustes del Usuario</DialogTitle>
        <p>----------Usuario si actualiza algun dato, Debe actualizar la pagina. Gracias!----------</p>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <>
              <TextField
                label="Nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Apellido"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Correo"
                name="correo"
                value={userData.correo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Solo si deseas cambiar tu contraseña, rellena este campo"
                name="nuevaContrasena"
                type="password"
                value={userData.nuevaContrasena}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Fecha de Nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={userData.fecha_nacimiento}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Biografía"
                name="biografia"
                value={userData.biografia}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <TextField
                label="Usuario"
                name="usuario"
                value={userData.usuario}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Carrera</InputLabel>
                <Select
                  name="id_carrera"
                  value={userData.id_carrera}
                  onChange={handleInputChange}
                  label="Carrera"
                >
                  {Object.entries(careers).map(([id, nombre]) => (
                    <MenuItem key={id} value={id}>
                      {nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Actualizar Datos
          </Button>
          <Button onClick={handleDeactivateAccount} color="secondary">
            Desactivar Cuenta
          </Button>
          <Button onClick={onClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <DialogTitle>Confirmar Contraseña</DialogTitle>
        <DialogContent>
          <TextField
            label="Contraseña Actual"
            type="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordConfirm} color="primary">
            Confirmar
          </Button>
          <Button onClick={() => setShowPasswordDialog(false)} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeactivate} onClose={() => setConfirmDeactivate(false)}>
        <DialogTitle>Confirmar Desactivación</DialogTitle>
        <DialogContent>
          <p>¿Está seguro de que desea desactivar su cuenta? Esta acción no se puede deshacer.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeactivateConfirm} color="secondary">
            Confirmar
          </Button>
          <Button onClick={() => setConfirmDeactivate(false)} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserSettings;
