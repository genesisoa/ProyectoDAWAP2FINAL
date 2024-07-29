from flask_restful import Resource, reqparse
from ..Components.EliminarUsuarioComponent import UsuarioEliminarComponent

class UsuarioEliminarService(Resource):

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario', type=int, required=True, help="ID del usuario es requerido")
        args = parser.parse_args()

        result = UsuarioEliminarComponent.cambiar_estado_usuario(args['id_usuario'])

        if result['result']:
            return {
                'message': result['message'],
                'data': result['data']
            }, 200
        else:
            return {
                'message': result['message'],
                'data': None
            }, 500
