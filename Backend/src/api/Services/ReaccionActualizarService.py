from flask_restful import Resource, reqparse
from ..Components.ReaccionActualizarComponent import ReaccionComponent

class ReaccionActualizarService(Resource):

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_reaccion', type=int, required=True, help="ID de la reacción es requerido")
        parser.add_argument('tipo', type=str, required=True, help="Tipo de reacción es requerido")

        args = parser.parse_args()

        result = ReaccionComponent.actualizar_tipo_reaccion(
            args['id_reaccion'],
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
