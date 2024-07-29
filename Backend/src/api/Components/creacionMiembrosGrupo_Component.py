from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class GrupoMiembroComponent:

    @staticmethod
    def agregar_miembro(id_grupo, id_usuario, rol):
        try:
            result = False
            data = None
            message = None

            sql = """
                INSERT INTO proyectop2.grupo_miembros (id_grupo, id_usuario, rol)
                VALUES (%s, %s, %s)
                RETURNING id
            """
            record = (id_grupo, id_usuario, rol)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql, record)
            if resul_insert['result']:
                result = True
                data = resul_insert['data']
                message = 'Miembro agregado exitosamente al grupo'
            else:
                message = resul_insert['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
