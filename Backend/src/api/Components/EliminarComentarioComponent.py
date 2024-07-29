from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ComentarioEliminarComponent:

    @staticmethod
    def eliminar_comentario(id):
        try:
            result = False
            message = None

            sql = """
                DELETE FROM proyectop2.comentarios
                WHERE id = %s
            """
            values = [id]

            resul_delete = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_delete['result']:
                result = True
                message = 'Comentario eliminado exitosamente'
            else:
                message = resul_delete['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, None, message)