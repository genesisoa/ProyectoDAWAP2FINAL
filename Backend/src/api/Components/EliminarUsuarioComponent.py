from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class UsuarioEliminarComponent:

    @staticmethod
    def cambiar_estado_usuario(id_usuario):
        try:
            result = False
            data = None
            message = None

            sql = """
                UPDATE proyectop2.usuarios
                SET user_state = false
                WHERE id = %s
                RETURNING id
            """
            values = [id_usuario]

            resul_update = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_update['result']:
                result = True
                data = resul_update['data']
                message = 'Estado del usuario actualizado a false exitosamente'
            else:
                message = resul_update['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
