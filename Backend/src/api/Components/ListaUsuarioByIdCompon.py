from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from datetime import datetime
class ListaUsuarioByIdComponent:

        @staticmethod
        def get_user_by_id(user_id):
            try:
                result = False
                data = None
                message = None

                sql = """
                    SELECT nombre, apellido, correo, contrasena, usuario, biografia, id_carrera, fecha_nacimiento
                    FROM proyectop2.usuarios
                    WHERE id = %s AND user_state = true
                """
                record = (user_id,)

                resul_query = DataBaseHandle.getRecords(sql, 1, record)
                if resul_query['result']:
                    result = True
                    # Convertir fecha a cadena
                    user_data = resul_query['data']
                    user_data['fecha_nacimiento'] = user_data['fecha_nacimiento'].strftime("%Y-%m-%d") if user_data[
                        'fecha_nacimiento'] else None
                    data = user_data
                    message = 'Usuario obtenido exitosamente'
                else:
                    message = resul_query['message']

            except Exception as err:
                HandleLogs.write_error(err)
                message = err.__str__()
            finally:
                return internal_response(result, data, message)
