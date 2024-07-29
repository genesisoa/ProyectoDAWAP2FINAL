from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class BusquedaPublicacionComponent:

    @staticmethod
    def buscar_publicaciones(palabra_clave):

        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT id, id_usuario, contenido
                FROM proyectop2.publicaciones
                WHERE contenido ILIKE %s
            """
            record = (f'%{palabra_clave}%',)

            resul_query = DataBaseHandle.getRecords(sql, 0, record)
            if resul_query['result']:
                result = True
                data = resul_query['data']
                message = 'Publicaciones encontradas exitosamente'
            else:
                message = resul_query['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)