from flask_restful import Resource, reqparse
from ..Components.creacionpubli_component import CreacionPubliComponent  # Importa el componente de publicaciones


class PubliCreationService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('contenido', type=str, required=True, help="Contenido de la publicación requerido")
        parser.add_argument('id_usuario', type=int, required=True, help="ID de usuario requerido")

        args = parser.parse_args()

        result_publicacion = CreacionPubliComponent.create_publicacion(
            args['id_usuario'],
            args['contenido']
        )

        if result_publicacion['result']:
            return {
                'message': 'Publicación creada exitosamente',
                'data': result_publicacion['data']
            }, 201
        else:
            return {
                'message': 'No se pudo crear la publicación',
                'data': None
            }, 500
