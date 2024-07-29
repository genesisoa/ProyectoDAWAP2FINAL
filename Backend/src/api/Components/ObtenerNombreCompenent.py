from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs

class NombreByIdComponent:
    @staticmethod
    def get_name_by_id(user_id):
        try:
            sql = "SELECT nombre FROM proyectop2.usuarios WHERE id = %s"
            result = DataBaseHandle.getRecords(sql, 1, (user_id,))

            if result['result']:
                if isinstance(result['data'], dict) and 'nombre' in result['data']:
                    return result['data']['nombre']
            return None
        except Exception as err:
            HandleLogs.write_error(err)
            return None
