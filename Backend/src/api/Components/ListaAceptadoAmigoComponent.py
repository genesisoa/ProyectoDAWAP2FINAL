from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ListaAmistadesComponent:
        @staticmethod
        def getPublicacionesPorCarrera(user_id):
            try:
                result = False
                data = None
                message = None

                # Obtener la carrera del usuario
                sql_carrera = """
                        SELECT id_carrera
                        FROM proyectop2.usuarios
                        WHERE id = %s
                    """
                result_carrera = DataBaseHandle.getRecords(sql_carrera, 1, (user_id,))
                if not result_carrera['result']:
                    raise Exception('Error al Obtener carrera del usuario -> ' + result_carrera['message'])

                if not result_carrera['data']:
                    raise Exception('Usuario no encontrado o sin carrera asignada')

                # Manejar correctamente el caso en el que no hay datos o la clave no está presente
                id_carrera = result_carrera['data'][0].get('id_carrera')
                if not id_carrera:
                    raise Exception('ID de carrera no encontrado en la respuesta del usuario')

                # Obtener las publicaciones de los usuarios con la misma carrera
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
