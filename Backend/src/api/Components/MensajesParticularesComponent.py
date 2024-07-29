from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class MensajesParticularesComponent:

    @staticmethod
    def insertar_mensaje(id_emisor, id_receptor, contenido):
        try:
            result = False
            message = None

            # Verificar que el emisor exista
            sql_verificar_emisor = """
                SELECT 1
                FROM proyectop2.usuarios
                WHERE id = %s
            """
            result_emisor = DataBaseHandle.getRecords(sql_verificar_emisor, 1, (id_emisor,))
            if not result_emisor['result'] or not result_emisor['data']:
                raise ValueError('El emisor no existe en la base de datos')

            # Verificar que el receptor exista
            sql_verificar_receptor = """
                SELECT 1
                FROM proyectop2.usuarios
                WHERE id = %s
            """
            result_receptor = DataBaseHandle.getRecords(sql_verificar_receptor, 1, (id_receptor,))
            if not result_receptor['result'] or not result_receptor['data']:
                raise ValueError('El receptor no existe en la base de datos')

            sql_insert = """
                INSERT INTO proyectop2.mensajes_particulares (id_emisor, id_receptor, contenido)
                VALUES (%s, %s, %s)
            """
            result_insert = DataBaseHandle.ExecuteNonQuery(sql_insert, (id_emisor, id_receptor, contenido))

            if result_insert['result']:
                result = True
                message = "Mensaje insertado correctamente"
            else:
                raise Exception('Error al insertar mensaje -> ' + result_insert['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, None, message)
