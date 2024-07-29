import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Avatar, Button } from '@material-ui/core';


const UserDetailDialog = ({ open, onClose, user }) => {
  const [careers, setCareers] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      // Fetch careers list
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
    }
  }, [user]);

  if (!user || !Object.keys(careers).length) return null; 

  const careerName = user.id_carrera && careers[user.id_carrera] ? careers[user.id_carrera] : 'Desconocida';

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles del Usuario</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ marginRight: '16px' }}>{user.nombre.charAt(0)}</Avatar>
          <div>
            <Typography variant="h6">{user.nombre} {user.apellido}</Typography>
            <Typography variant="body1">Carrera: {careerName}</Typography>
            <Typography variant="body1">Biografía: {user.biografia}</Typography>
          </div>
        </div>
        <Button onClick={onClose} color="primary" style={{ marginTop: '16px' }}>
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
