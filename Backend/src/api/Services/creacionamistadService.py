from flask_restful import Resource, reqparse
from ..Components.creacionamistadComponent import AmistadComponent

class AmistadService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario1', type=int, required=True, help="ID del usuario 1 es requerido")
        parser.add_argument('id_usuario2', type=int, required=True, help="ID del usuario 2 es requerido")

        args = parser.parse_args()

        result = AmistadComponent.crear_amistad(
            args['id_usuario1'],
            args['id_usuario2']
        )

        if result['result']:
            return {
                'message': result['message'],
                'data': result['data']
            }, 201
        else:
            return {
                'message': result['message'],
                'data': None
            }, 500
