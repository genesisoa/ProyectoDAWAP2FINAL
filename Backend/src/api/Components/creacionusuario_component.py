from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class CreacionUsuarioComponent:

    @staticmethod
    def create_user(nombre, apellido, correo, contrasena, usuario, fecha_nacimiento=None, biografia=None, foto_perfil='default.jpg', id_carrera=None):
        try:
            result = False
            data = None
            message = None

            sql = """
                INSERT INTO proyectop2.usuarios (
                    nombre, apellido, correo, contrasena, usuario, fecha_nacimiento, biografia, foto_perfil, id_carrera, user_state
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, true)
            """
            record = (nombre, apellido, correo, contrasena, usuario, fecha_nacimiento, biografia, foto_perfil, id_carrera)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_insert['result']:
                result = True
                data = resul_insert['data']
                message = 'Usuario creado exitosamente'
            else:
                message = resul_insert['Ya esta en uso ese nombre de usuario, intente uno nuevo']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
