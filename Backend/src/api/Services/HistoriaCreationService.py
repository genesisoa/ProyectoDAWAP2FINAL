from flask_restful import Resource, reqparse
from ..Components.CreacionHistoriaComponent import CreacionHistoriaComponent

class HistoriaCreationService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('contenido', type=str, required=True, help="Contenido de la historia requerido")
        parser.add_argument('id_usuario', type=int, required=True, help="ID de usuario requerido")
        parser.add_argument('visibilidad', type=str, required=True, choices=('publico', 'privado'), help="Visibilidad de la historia requerida")

        args = parser.parse_args()

        result_historia = CreacionHistoriaComponent.create_historia(
            args['id_usuario'],
            args['contenido'],
            args['visibilidad']
        )

        if result_historia['result']:
            return {
                'message': 'Historia creada exitosamente',
                'data': result_historia['data']
            }, 201
        else:
            return {
                'message': 'No se pudo crear la historia',
                'data': None
            }, 500
