select * from proyectop2.carreras
CREATE TABLE proyectop2.carreras (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

INSERT INTO proyectop2.carreras (nombre) VALUES
('Arquitectura'),
('Ciencia de Datos e Inteligencia Artificial'),
('Ingeniería Civil'),
('Ingeniería de los Alimentos'),
('Ingeniería Industrial'),
('Ingeniería Ambiental'),
('Software'),
('Sistemas de Información'),
('Tecnologías de la Información'),
('Telemática'),
('Agronomía'),
('Agropecuaria'),
('Medicina Veterinaria'),
('Gastronomía'),
('Biología'),
('Bioquímica y Farmacia'),
('Dietética y Nutrición'),
('Enfermería'),
('Fonoaudiología'),
('Odontología'),
('Terapia de Lenguaje'),
('Ciencias de la Educación Mención Informática'),
('Administración de Empresas'),
('Comercio Exterior'),
('Contabilidad y Auditoría'),
('Economía'),
('Economía Internacional'),
('Finanzas'),
('Gestión de la Información Gerencial'),
('Mercadotecnia'),
('Negocios Internacionales'),
('Turismo'),
('Otro');


select * from proyectop2.usuarios

-- Tabla de usuarios
CREATE TABLE proyectop2.usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    biografia TEXT,
    foto_perfil VARCHAR(255),
    id_carrera INTEGER REFERENCES proyectop2.carreras(id)
);

ALTER TABLE proyectop2.usuarios
ADD COLUMN user_state BOOLEAN DEFAULT true;

ALTER TABLE proyectop2.usuarios
ADD COLUMN usuario VARCHAR(15);

ALTER TABLE proyectop2.usuarios
ADD CONSTRAINT unique_usuario UNIQUE (usuario);


select * from proyectop2.publicaciones

-- Tabla de publicaciones
CREATE TABLE proyectop2.publicaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES proyectop2.usuarios(id),
    contenido TEXT NOT NULL
   );


CREATE TABLE proyectop2.comentarios (
    id SERIAL PRIMARY KEY,
    id_publicacion INTEGER REFERENCES proyectop2.publicaciones(id),
    id_usuario INTEGER REFERENCES proyectop2.usuarios(id),
    contenido TEXT NOT NULL
);


CREATE TABLE proyectop2.reacciones (
    id SERIAL PRIMARY KEY,
    id_publicacion INTEGER REFERENCES proyectop2.publicaciones(id),
    id_usuario INTEGER REFERENCES proyectop2.usuarios(id),
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('me gusta', 'me encanta', 'me divierte', 'me sorprende', 'me entristece', 'me enfada')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE proyectop2.mensajes_grupos (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES proyectop2.usuarios(id) ON DELETE CASCADE,
    contenido TEXT NOT NULL
);
 
