from flask_restful import Resource
from ..Components.datosUsuarios import  UsuarioByIdComponent  # Asegúrate de que este componente esté correctamente importado
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success, response_not_found


class ByIDService(Resource):
    def get(self, username):
        try:
            resultado = UsuarioByIdComponent.get_user_id_by_username(username)
            if resultado:
                return response_success({"user_id": resultado})
            else:
                return response_not_found()
        except Exception as err:
            return response_error("Error en el método: " + str(err))