from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class MensajeComponent:

    @staticmethod
    def crear_mensaje(id_usuario, contenido):
        try:
            result = False
            data = None
            message = None

            sql = """
                INSERT INTO proyectop2.mensajes_grupos ( id_usuario, contenido)
                VALUES ( %s, %s)
                RETURNING id
            """
            record = (id_usuario, contenido)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_insert['result']:
                result = True
                data = resul_insert['data']
                message = 'Mensaje creado exitosamente'
            else:
                message = resul_insert['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
