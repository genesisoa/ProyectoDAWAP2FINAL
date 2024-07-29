from flask_restful import Resource
from ..Components.ListaUsuarioByIdCompon import ListaUsuarioByIdComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success, response_not_found

class ListaUsuarioByIDService(Resource):
    @staticmethod
    def get(user_id):
        try:
            HandleLogs.write_log(f"Ejecutando servicio para obtener usuario con ID: {user_id}")

            resultado = ListaUsuarioByIdComponent.get_user_by_id(user_id)

            if resultado['result']:
                if resultado['data']:
                    return response_success(resultado['data'])
                else:
                    return response_not_found()
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
