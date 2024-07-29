from flask_restful import Resource
from ..Components.ListaComentariosComponent import ComentariosPorCarreraComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success, response_not_found

class ComentariosPorPublicacionService(Resource):
    @staticmethod
    def get(post_id):
        try:
            HandleLogs.write_log(f"Ejecutando servicio de Obtener Comentarios para la publicación ID: {post_id}")

            resultado = ComentariosPorCarreraComponent.getComentariosPorPublicacion(post_id)

            if resultado['result']:
                if len(resultado['data']) > 0:
                    return response_success(resultado['data'])
                else:
                    return response_not_found()
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
