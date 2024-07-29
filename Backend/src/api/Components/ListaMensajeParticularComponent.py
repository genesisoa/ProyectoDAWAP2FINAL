from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from datetime import datetime


class ListaMensajesParticularesComponent:
        @staticmethod
        def obtener_mensajes(id_emisor, id_receptor):
            try:
                result = False
                data = None
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

                # Obtener mensajes entre el emisor y el receptor
                sql_obtener_mensajes = """
                    SELECT id, id_emisor, id_receptor, contenido, fecha_envio
                    FROM proyectop2.mensajes_particulares
                    WHERE (id_emisor = %s AND id_receptor = %s) OR (id_emisor = %s AND id_receptor = %s)
                    ORDER BY fecha_envio ASC
                """
                result_mensajes = DataBaseHandle.getRecords(sql_obtener_mensajes, 0,
                                                            (id_emisor, id_receptor, id_receptor, id_emisor))

                if result_mensajes['result']:
                    # Convertir fecha_envio a formato string
                    for mensaje in result_mensajes['data']:
                        mensaje['fecha_envio'] = mensaje['fecha_envio'].strftime('%Y-%m-%d %H:%M:%S')

                    result = True
                    data = result_mensajes['data']
                else:
                    message = 'No se encontraron mensajes'

            except Exception as err:
                HandleLogs.write_error(err)
                message = str(err)
            finally:
                return internal_response(result, data, message)
