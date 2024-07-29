from flask_restful import Resource, reqparse
from ..Components.ChatInsertarComponent import MensajeComponent

class MensajeService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario', type=int, required=True, help="ID del usuario es requerido")
        parser.add_argument('contenido', type=str, required=True, help="Contenido del mensaje es requerido")

        args = parser.parse_args()

        result = MensajeComponent.crear_mensaje(
            args['id_usuario'],
            args['contenido']
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
