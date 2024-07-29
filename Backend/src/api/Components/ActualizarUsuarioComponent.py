from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class UsuarioComponent:
    @staticmethod
    def actualizar_usuario(id_usuario, nombre=None, apellido=None, correo=None, contrasena=None, fecha_nacimiento=None, biografia=None, usuario=None, id_carrera=None):
        try:
            result = False
            data = None
            message = None

            updates = []
            values = []

            if nombre is not None:
                updates.append("nombre = %s")
                values.append(nombre)
            if apellido is not None:
                updates.append("apellido = %s")
                values.append(apellido)
            if correo is not None:
                updates.append("correo = %s")
                values.append(correo)
            if contrasena is not None:
                # Sin hashing de la contraseña
                updates.append("contrasena = %s")
                values.append(contrasena)
            if fecha_nacimiento is not None and fecha_nacimiento != '':
                updates.append("fecha_nacimiento = %s")
                values.append(fecha_nacimiento)
            if biografia is not None:
                updates.append("biografia = %s")
                values.append(biografia)
            if usuario is not None:
                updates.append("usuario = %s")
                values.append(usuario)
            if id_carrera is not None:
                updates.append("id_carrera = %s")
                values.append(id_carrera)

            if not updates:
                return internal_response(result, data, "No se proporcionaron datos para actualizar")

            values.append(id_usuario)
            set_clause = ", ".join(updates)
            sql = f"""
                UPDATE proyectop2.usuarios
                SET {set_clause}
                WHERE id = %s
                RETURNING id
            """

            resul_update = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_update['result']:
                result = True
                data = resul_update['data']
                message = 'Usuario actualizado exitosamente'
            else:
                message = resul_update['Ya esta en uso ese nombre de usuario, Intente otro']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
