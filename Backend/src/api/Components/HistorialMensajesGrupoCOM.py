from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs

class MensajeComponent:
    @staticmethod
    def obtener_mensajes(id_grupo):
        try:
            sql = """
                SELECT * FROM proyectop2.mensajes_grupos
                WHERE id_grupo = %s
                ORDER BY id ASC
            """
            result = DataBaseHandle.getRecords(sql, 1, (id_grupo,))

            if result['result']:
                return {
                    'result': True,
                    'data': result['data']
                }
            else:
                return {
                    'result': False,
                    'message': 'No se encontraron mensajes.'
                }
        except Exception as err:
            HandleLogs.write_error(err)
            return {
                'result': False,
                'message': str(err)
            }
