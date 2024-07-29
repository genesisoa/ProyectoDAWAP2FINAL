from flask_restful import Resource
from ..Components.ObtenerNombreCompenent import NombreByIdComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success, response_not_found

class ByNombreService(Resource):
    def get(self, user_id):
        try:
            nombre_usuario = NombreByIdComponent.get_name_by_id(user_id)
            if nombre_usuario:
                return response_success({"nombre": nombre_usuario})
            else:
                return response_not_found(message="Usuario no encontrado.")
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
