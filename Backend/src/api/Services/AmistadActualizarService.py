from flask_restful import Resource, reqparse
from ..Components.AmistadActualizarComponent import AmistadActualizarComponent

class AmistadActualizarService(Resource):

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario1', type=int, required=True, help="ID del primer usuario es requerido")
        parser.add_argument('id_usuario2', type=int, required=True, help="ID del segundo usuario es requerido")
        parser.add_argument('estado', type=str, required=True, help="Estado de la amistad es requerido")

        args = parser.parse_args()

        result = AmistadActualizarComponent.actualizar_estado(
            args['id_usuario1'],
            args['id_usuario2'],
            args['estado']
        )

        if result['result']:
            return {
                'message': result['message'],
                'data': result['data']
            }, 200  # Código de éxito
        else:
            return {
                'message': result['message'],
                'data': None
            }, 500
