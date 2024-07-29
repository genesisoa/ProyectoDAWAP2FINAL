import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@material-ui/core';

const CreacionHistoria = ({ open, onClose, onSubmit }) => {
  const [contenido, setContenido] = useState('');
  const [visibilidad, setVisibilidad] = useState('publico');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleContenidoChange = (event) => {
    setContenido(event.target.value);
  };

  const handleVisibilidadChange = (event) => {
    setVisibilidad(event.target.value);
  };

  const handleSubmit = () => {
    if (contenido.trim()) {
      onSubmit(contenido, visibilidad)
        .then((result) => {
          if (result.success) {
            setSuccess(result.message || 'Historia creada exitosamente.');
            setError('');
            setContenido('');
            setVisibilidad('publico');
            onClose();  // Cierra el diálogo al enviar la historia exitosamente
          } else {
            setError(result.message || 'Error al crear la historia.');
            setSuccess('');
          }
        })
        .catch((err) => {
          setError('Error al comunicarse con el servidor.');
          setSuccess('');
        });
    } else {
      setError('Por favor, escribe el contenido de la historia.');
      setSuccess('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Historia</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Escribe el contenido de la historia..."
          value={contenido}
          onChange={handleContenidoChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          select
          label="Visibilidad"
          value={visibilidad}
          onChange={handleVisibilidadChange}
          variant="outlined"
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Crear Historia
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreacionHistoria;
