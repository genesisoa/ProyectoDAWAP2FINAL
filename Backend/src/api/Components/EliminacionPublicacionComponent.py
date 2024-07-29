from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class PublicacionEliminarComponent:

    @staticmethod
    def eliminar_publicacion(id):
        try:
            result = False
            message = None

            # Primero, elimina todos los comentarios relacionados
            sql_delete_comments = """
                DELETE FROM proyectop2.comentarios
                WHERE id_publicacion = %s
            """
            values_comments = [id]
            resul_delete_comments = DataBaseHandle.ExecuteNonQuery(sql_delete_comments, values_comments)

            if not resul_delete_comments['result']:
                message = resul_delete_comments['message']
                raise Exception('Error al eliminar comentarios: ' + message)

            sql_delete_publicacion = """
                DELETE FROM proyectop2.publicaciones
                WHERE id = %s
            """
            values_publicacion = [id]
            resul_delete_publicacion = DataBaseHandle.ExecuteNonQuery(sql_delete_publicacion, values_publicacion)

            if resul_delete_publicacion['result']:
                result = True
                message = 'Publicación eliminada exitosamente'
            else:
                message = resul_delete_publicacion['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, None, message)
