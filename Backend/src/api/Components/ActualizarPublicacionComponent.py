from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class PublicacionActualizarComponent:

    @staticmethod
    def actualizar_publicacion(id, contenido):
        try:
            result = False
            data = None
            message = None

            # Define la instrucción de actualización y los parámetros
            sql = """
                UPDATE proyectop2.publicaciones
                SET contenido = %s
                WHERE id = %s
                RETURNING id
            """
            values = [contenido, id]

            resul_update = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_update['result']:
                result = True
                data = resul_update['data']
                message = 'Publicación actualizada exitosamente'
            else:
                message = resul_update['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
