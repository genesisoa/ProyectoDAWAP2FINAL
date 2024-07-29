from flask_restful import Resource, reqparse
from ..Components.ActualizarComentarioComponent import ComentarioActualizarComponent

class ComentarioActualizarService(Resource):

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, required=True, help="ID del comentario es requerido")
        parser.add_argument('contenido', type=str, required=True, help="Nuevo contenido es requerido")

        args = parser.parse_args()

        # Actualizar la publicación
        result = ComentarioActualizarComponent.actualizar_comentario(
            id=args['id'],
            contenido=args['contenido']
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
            }, 500  # Código de error de servidor
