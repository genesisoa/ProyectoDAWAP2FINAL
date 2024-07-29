from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ComentariosPorCarreraComponent:

    @staticmethod
    def getComentariosPorPublicacion(post_id):
        try:
            result = False
            data = None
            message = None

            # Validar que el post_id sea válido
            if not post_id:
                raise Exception('ID de publicación no proporcionado')

            # Paso 1: Obtener los comentarios para una publicación específica
            sql_comentarios = """
                SELECT c.id, c.id_usuario, c.contenido
                FROM proyectop2.comentarios c
                WHERE c.id_publicacion = %s
            """
            result_comentarios = DataBaseHandle.getRecords(sql_comentarios, 0, (post_id,))
            if result_comentarios['result']:
                result = True
                data = result_comentarios['data']
            else:
                message = 'Error al Obtener datos de comentarios -> ' + result_comentarios['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
