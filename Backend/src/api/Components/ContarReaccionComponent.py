# ReaccionConteoComponent.py
from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ReaccionConteoComponent:

    @staticmethod
    def contar_reacciones(id_publicacion):
        try:
            count_sql = """
                SELECT tipo, COUNT(*) as cantidad
                FROM proyectop2.reacciones
                WHERE id_publicacion = %s
                GROUP BY tipo
            """
            count_record = (id_publicacion,)
            count_result = DataBaseHandle.getRecords(count_sql, -1, count_record)

            if count_result['result']:
                reacciones_por_tipo = count_result['data']
                return internal_response(True, reacciones_por_tipo, 'Conteo de reacciones obtenido exitosamente')
            else:
                return internal_response(False, None, count_result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return internal_response(False, None, str(err))
