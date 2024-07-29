from flask_restful import Resource, reqparse
from ..Components.CreacionPubliGrupoComponent import CreacionPublicacionGrupoComponent

class PublicacionGrupoCreationService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_grupo', type=int, required=True, help="ID del grupo requerido")
        parser.add_argument('id_usuario', type=int, required=True, help="ID de usuario requerido")
        parser.add_argument('contenido', type=str, required=True, help="Contenido de la publicación requerido")

        args = parser.parse_args()

        result_publicacion = CreacionPublicacionGrupoComponent.create_publicacion_grupo(
            args['id_grupo'],
            args['id_usuario'],
            args['contenido']
        )

        if result_publicacion['result']:
            return {
                'message': 'Publicación en grupo creada exitosamente',
                'data': result_publicacion['data']
            }, 201
        else:
            return {
                'message': 'No se pudo crear la publicación en grupo',
                'data': None
            }, 500
