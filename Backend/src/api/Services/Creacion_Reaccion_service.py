from flask_restful import Resource, reqparse
from ..Components.CreacionReaccionComponent import ReaccionComponent

class ReaccionService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_publicacion', type=int, required=True, help="ID de la publicación es requerido")
        parser.add_argument('id_usuario', type=int, required=True, help="ID del usuario es requerido")
        parser.add_argument('tipo', type=str, required=True, help="El tipo de reacción es requerido")

        args = parser.parse_args()

        result = ReaccionComponent.crear_reaccion(
            args['id_publicacion'],
            args['id_usuario'],
            args['tipo']
        )

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
