from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
class CreacionUsuarioComponent:

    @staticmethod
    def check_username_exists(usuario):
        try:
            sql = "SELECT COUNT(*) FROM proyectop2.usuarios WHERE usuario = %s"
            record = (usuario,)
            result = DataBaseHandle.ExecuteQuery(sql, record)

            return result['data'][0] > 0

        except Exception as err:
            HandleLogs.write_error(err)
            return False
