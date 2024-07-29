from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class ReaccionComponent:

    @staticmethod
    def actualizar_tipo_reaccion(id_reaccion, tipo):
        try:
            result = False
            data = None
            message = None

            tipos_permitidos = ['me gusta', 'me encanta', 'me divierte', 'me sorprende', 'me entristece', 'me enfada']
            if tipo not in tipos_permitidos:
                return internal_response(result, data, "Tipo de reacción no válido")

            sql = """
                UPDATE proyectop2.reacciones
                SET tipo = %s
                WHERE id = %s
                RETURNING id
            """
            values = [tipo, id_reaccion]

            resul_update = DataBaseHandle.ExecuteNonQuery(sql, values)
            if resul_update['result']:
                result = True
                data = resul_update['data']
                message = 'Reacción actualizada exitosamente'
            else:
                message = resul_update['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
