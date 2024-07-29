
import React from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const RegistroForm = ({ handleSubmitRegistro, registroUsuario, handleInputChange, handleCarreraChange, carreras }) => {
  return (
    <Paper elevation={3} className="paper">
      <form onSubmit={handleSubmitRegistro}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              size="small"
              value={registroUsuario.nombre}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="apellido"
              label="Apellido"
              name="apellido"
              size="small"
              value={registroUsuario.apellido}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo Electrónico"
              name="correo"
              size="small"
              value={registroUsuario.correo}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Nombre de Usuario"
              name="usuario"
              size="small"
              value={registroUsuario.usuario}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contrasena"
              label="Contraseña"
              name="contrasena"
              type="password"
              size="small"
              value={registroUsuario.contrasena}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fecha_nacimiento"
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              size="small"
              value={registroUsuario.fecha_nacimiento}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="biografia"
              label="Biografía"
              name="biografia"
              multiline
              rows={4}
              size="small"
              value={registroUsuario.biografia}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="carrera-label">Carrera</InputLabel>
              <Select
                labelId="carrera-label"
                id="carrera"
                value={registroUsuario.id_carrera}
                onChange={handleCarreraChange}
                label="Carrera"
              >
                {carreras.map((carrera) => (
                  <MenuItem key={carrera.id} value={carrera.id}>
                    {carrera.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          
          style={{ marginTop: '16px' , color: '#830400' }}
        >
          Registrarse
        </Button>
      </form>
    </Paper>
  );
};

export default RegistroForm;
