from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response


class ReaccionComponent:

    @staticmethod
    def crear_reaccion(id_publicacion, id_usuario, tipo):
        try:
            check_sql = """
                SELECT id FROM proyectop2.reacciones
                WHERE id_publicacion = %s AND id_usuario = %s
            """
            check_record = (id_publicacion, id_usuario)
            check_result = DataBaseHandle.getRecords(check_sql, 1, check_record)

            if check_result['result']:
                if check_result['data']:
                    # Si existe, realiza la actualización
                    id_reaccion = check_result['data']['id']
                    update_sql = """
                        UPDATE proyectop2.reacciones
                        SET tipo = %s, fecha_creacion = CURRENT_TIMESTAMP
                        WHERE id = %s
                    """
                    update_record = (tipo, id_reaccion)
                    update_result = DataBaseHandle.ExecuteNonQuery(update_sql, update_record)

                    if update_result['result']:
                        return internal_response(True, update_result['data'], 'Reacción actualizada exitosamente')
                    else:
                        return internal_response(False, None, update_result['message'])
                else:
                    # Si no existe, realiza la inserción
                    insert_sql = """
                        INSERT INTO proyectop2.reacciones (id_publicacion, id_usuario, tipo)
                        VALUES (%s, %s, %s)
                        RETURNING id
                    """
                    insert_record = (id_publicacion, id_usuario, tipo)
                    insert_result = DataBaseHandle.ExecuteNonQuery(insert_sql, insert_record)

                    if insert_result['result']:
                        return internal_response(True, insert_result['data'], 'Reacción creada exitosamente')
                    else:
                        return internal_response(False, None, insert_result['message'])
            else:
                return internal_response(False, None, check_result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return internal_response(False, None, str(err))
