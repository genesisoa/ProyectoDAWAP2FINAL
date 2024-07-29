from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class AmistadComponent:

    @staticmethod
    def crear_amistad(id_usuario1, id_usuario2):
        try:
            result = False
            data = None
            message = None

            sql = """
                INSERT INTO proyectop2.amistades (id_usuario1, id_usuario2, estado)
                VALUES (%s, %s, 'pendiente')
                RETURNING id
            """
            record = (id_usuario1, id_usuario2)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_insert['result']:
                result = True
                data = resul_insert['data']
                message = 'Solicitud de amistad creada exitosamente'
            else:
                message = resul_insert['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
