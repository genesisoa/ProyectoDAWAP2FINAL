from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs


class UsuarioByIdComponent:
    @staticmethod
    def get_user_id_by_username(username):
        try:
            sql = "SELECT id FROM proyectop2.usuarios WHERE usuario = %s"
            result = DataBaseHandle.getRecords(sql, 1, (username,))

            if result['result']:
                if isinstance(result['data'], dict) and 'id' in result['data']:
                    return result['data']['id']
            return None
        except Exception as err:
            HandleLogs.write_error(err)
            return None
