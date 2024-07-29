from flask_restful import Resource
from ..Components.ListaPublicacionUsuarioComponent import PublicacionUsuarioComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success

class PublicacionesPorUsuarioService(Resource):
    @staticmethod
    def get(user_id):
        try:
            HandleLogs.write_log(f"Ejecutando servicio para obtener publicaciones del usuario ID {user_id}")
            resultado = PublicacionUsuarioComponent.getAllPubliUsuario(user_id)
            if resultado['result']:
                if resultado['data']:
                    return response_success(resultado['data'])
                else:
                    return response_success([])
            else:
                return response_error(resultado['message'])
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
