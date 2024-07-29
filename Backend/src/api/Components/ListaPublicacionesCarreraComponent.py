from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class PublicacionesPorCarreraComponent:

    @staticmethod
    def getPublicacionesPorCarrera(user_id):
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
                raise Exception('Error al Obtener datos del usuario -> ' + result_usuario['message'])

            if not result_usuario['data']:
                raise Exception('Usuario no encontrado')

            sql_carrera = """
                SELECT id_carrera
                FROM proyectop2.usuarios
                WHERE id = %s
            """
            result_carrera = DataBaseHandle.getRecords(sql_carrera, 1, (user_id,))
            if not result_carrera['result']:
                raise Exception('Error al Obtener carrera del usuario -> ' + result_carrera['message'])

            if not result_carrera['data']:
                raise Exception('Usuario no tiene carrera asignada')

            id_carrera = result_carrera['data'].get('id_carrera')
            if id_carrera is None:
                raise Exception('ID de carrera no encontrado en la respuesta del usuario')

            sql_publicaciones = """
                SELECT p.id, p.id_usuario, p.contenido
                FROM proyectop2.publicaciones p
                JOIN proyectop2.usuarios u ON p.id_usuario = u.id
                WHERE u.id_carrera = %s
            """
            result_publicaciones = DataBaseHandle.getRecords(sql_publicaciones, 0, (id_carrera,))
            if result_publicaciones['result']:
                result = True
                data = result_publicaciones['data']
            else:
                message = 'Error al Obtener datos de publicaciones -> ' + result_publicaciones['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
