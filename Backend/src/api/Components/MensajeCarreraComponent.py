from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class MensajesPorCarreraComponent:

    @staticmethod
    def getMensajesPorCarrera(user_id):
        try:
            result = False
            data = None
            message = None

            sql_usuario = """
                SELECT id
                FROM proyectop2.usuarios
                WHERE id = %s
            """
            result_usuario = DataBaseHandle.getRecords(sql_usuario, 1, (user_id,))
            if not result_usuario['result']:
                raise Exception('Error al obtener datos del usuario -> ' + result_usuario['message'])

            if not result_usuario['data']:
                raise Exception('Usuario no encontrado')

            sql_carrera = """
                SELECT id_carrera
                FROM proyectop2.usuarios
                WHERE id = %s
            """
            result_carrera = DataBaseHandle.getRecords(sql_carrera, 1, (user_id,))
            if not result_carrera['result']:
                raise Exception('Error al obtener carrera del usuario -> ' + result_carrera['message'])

            if not result_carrera['data']:
                raise Exception('Usuario no tiene carrera asignada')

            id_carrera = result_carrera['data'].get('id_carrera')
            if id_carrera is None:
                raise Exception('ID de carrera no encontrado en la respuesta del usuario')

            sql_mensajes = """
                SELECT m.id, m.id_usuario, m.contenido
                FROM proyectop2.mensajes_grupos m
                JOIN proyectop2.usuarios u ON m.id_usuario = u.id
                WHERE u.id_carrera = %s
                ORDER BY m.id ASC
            """
            result_mensajes = DataBaseHandle.getRecords(sql_mensajes, 0, (id_carrera,))
            if result_mensajes['result']:
                result = True
                data = result_mensajes['data']
            else:
                message = 'Error al obtener mensajes -> ' + result_mensajes['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
