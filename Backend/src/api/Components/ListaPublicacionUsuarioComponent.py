from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class PublicacionUsuarioComponent:

    @staticmethod
    def getAllPubliUsuario(user_id):
        try:
            result = False
            data = None
            message = None
            sql = """
                SELECT
                    p.id AS publicacion_id,
                    p.contenido AS publicacion_contenido
                FROM proyectop2.publicaciones p
                JOIN proyectop2.usuarios u ON p.id_usuario = u.id
                WHERE u.id = %s
            """

            result_user = DataBaseHandle.getRecords(sql, (user_id,))
            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = 'Error al obtener datos de publicaciones -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
