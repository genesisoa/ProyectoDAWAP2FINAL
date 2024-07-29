from datetime import datetime
from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class PubliComponent:

    @staticmethod
    def format_date(date_obj):
        try:
            return date_obj.strftime('%Y-%m-%d %H:%M:%S')
        except Exception as e:
            HandleLogs.write_error(e)
            return None

    @staticmethod
    def getAllPubli():
        try:
            result = False
            data = None
            message = None
            sql = "SELECT * FROM proyectop2.publicaciones"

            result_user = DataBaseHandle.getRecords(sql, 0)
            if result_user['result']:
                result = True
                data = result_user['data']
                # Formatea las fechas en los datos obtenidos
                for record in data:
                    if 'fecha_creacion' in record and isinstance(record['fecha_creacion'], datetime):
                        record['fecha_creacion'] = PubliComponent.format_date(record['fecha_creacion'])
            else:
                message = 'Error al Obtener datos de publicaciones -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
