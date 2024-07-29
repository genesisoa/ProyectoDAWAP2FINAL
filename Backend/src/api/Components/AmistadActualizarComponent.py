from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class AmistadActualizarComponent:

    @staticmethod
    def actualizar_estado(id_usuario1, id_usuario2, estado):
        try:
            result = False
            data = None
            message = None

            sql = """
                UPDATE proyectop2.amistades
                SET estado = %s
                WHERE (id_usuario1 = %s AND id_usuario2 = %s) 
                   OR (id_usuario1 = %s AND id_usuario2 = %s)
                RETURNING id
            """
            values = [estado, id_usuario1, id_usuario2, id_usuario2, id_usuario1]

            resul_update = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_update['result']:
                result = True
                data = resul_update['data']
                message = 'Estado de amistad actualizado exitosamente'
            else:
                message = resul_update['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
