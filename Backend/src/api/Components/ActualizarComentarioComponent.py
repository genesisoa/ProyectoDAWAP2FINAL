from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ComentarioActualizarComponent:

    @staticmethod
    def actualizar_comentario(id, contenido):
        try:
            result = False
            data = None
            message = None

            sql = """
                UPDATE proyectop2.comentarios
                SET contenido = %s
                WHERE id = %s
                RETURNING id
            """
            values = [contenido, id]

            resul_update = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_update['result']:
                result = True
                data = resul_update['data']
                message = 'Comentario actualizada exitosamente'
            else:
                message = resul_update['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
