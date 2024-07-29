from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class CreacionHistoriaComponent:

    @staticmethod
    def create_historia(id_usuario, contenido, visibilidad):
        try:
            result = False
            data = None
            message = None

            sql = """
                INSERT INTO proyectop2.historias (id_usuario, contenido, visibilidad)
                VALUES (%s, %s, %s)
                RETURNING id
            """
            record = (id_usuario, contenido, visibilidad)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_insert['result']:
                result = True
                data = resul_insert['data']
                message = 'Historia creada exitosamente'
            else:
                message = resul_insert['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
