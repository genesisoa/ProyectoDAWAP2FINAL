from flask_restful import Resource, reqparse
from ..Components.CreacionComentarioComponent import CreacionComentarioComponent

class ComentarioCreationService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_publicacion', type=int, required=True, help="ID de la publicación requerido")
        parser.add_argument('id_usuario', type=int, required=True, help="ID del usuario requerido")
        parser.add_argument('contenido', type=str, required=True, help="Contenido del comentario requerido")

        args = parser.parse_args()

        result_comentario = CreacionComentarioComponent.create_comentario(
            args['id_publicacion'],
            args['id_usuario'],
            args['contenido']
        )

        if result_comentario['result']:
            return {
                'message': 'Comentario creado exitosamente',
                'data': result_comentario['data']
            }, 201
        else:
            return {
                'message': 'No se pudo crear el comentario',
                'data': None
            }, 500
