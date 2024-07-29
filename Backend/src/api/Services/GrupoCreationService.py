from flask_restful import Resource, reqparse
from ..Components.CreacionGrupoComponent import CreacionGrupoComponent  # Importa el componente de grupos

class GrupoCreationService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('nombre', type=str, required=True, help="Nombre del grupo requerido")
        parser.add_argument('descripcion', type=str, required=False, help="Descripción del grupo")
        parser.add_argument('id_creador', type=int, required=True, help="ID del creador requerido")

        args = parser.parse_args()

        result_grupo = CreacionGrupoComponent.create_grupo(
            args['nombre'],
            args['descripcion'],
            args['id_creador']
        )

        if result_grupo['result']:
            return {
                'message': 'Grupo creado exitosamente',
                'data': result_grupo['data']
            }, 201
        else:
            return {
                'message': 'No se pudo crear el grupo',
                'data': None
            }, 500
