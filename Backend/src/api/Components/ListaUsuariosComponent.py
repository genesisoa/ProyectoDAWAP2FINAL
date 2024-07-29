from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ListaUsuariosComponent:
    @staticmethod
    def getAllUsuario():
        try:
            result = False
            data = None
            message = None
            # Actualiza la consulta SQL para filtrar por user_state = true
            sql = """
                SELECT id, nombre, biografia, id_carrera 
                FROM proyectop2.usuarios 
                WHERE user_state = true
            """

            result_user = DataBaseHandle.getRecords(sql, 0)
            if result_user['result']:
                result = True
                data = result_user['data']
            else:
                message = 'Error al Obtener datos de usuarios -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
