// src/components/GroupDialog.jsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

const GroupDialog = ({ open, onClose, onSubmit }) => {
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [groupSuccess, setGroupSuccess] = useState('');
  const [groupError, setGroupError] = useState('');

  const handleGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const handleGroupDescriptionChange = (event) => {
    setNewGroupDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (newGroupName.trim()) {
      onSubmit(newGroupName, newGroupDescription)
        .then(response => {
          if (response.success) {
            setGroupSuccess(response.message || 'Grupo creado exitosamente.');
            setGroupError('');
          } else {
            setGroupError(response.message || 'Error al crear el grupo.');
            setGroupSuccess('');
          }
        })
        .catch(error => {
          setGroupError('Error al comunicarse con el servidor.');
          setGroupSuccess('');
        });
    } else {
      setGroupError('Por favor, ingresa el nombre del grupo.');
      setGroupSuccess('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Grupo</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          fullWidth
          label="Nombre del Grupo"
          value={newGroupName}
          onChange={handleGroupNameChange}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Descripción del Grupo"
          value={newGroupDescription}
          onChange={handleGroupDescriptionChange}
          style={{ marginBottom: '10px' }}
        />
        {groupSuccess && <Typography variant="body2" color="primary">{groupSuccess}</Typography>}
        {groupError && <Typography variant="body2" color="error">{groupError}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Crear Grupo</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupDialog;
