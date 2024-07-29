from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class CreacionGrupoComponent:

    @staticmethod
    def create_grupo(nombre, descripcion, id_creador):
        try:
            result = False
            data = None
            message = None

            sql = """
                INSERT INTO proyectop2.grupos (nombre, descripcion, id_creador)
                VALUES (%s, %s, %s)
                RETURNING id
            """
            record = (nombre, descripcion, id_creador)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_insert['result']:
                result = True
                data = resul_insert['data']
                message = 'Grupo creado exitosamente'
            else:
                message = resul_insert['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
