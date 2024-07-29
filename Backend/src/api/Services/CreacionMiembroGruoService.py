from flask_restful import Resource, reqparse
from ..Components.creacionMiembrosGrupo_Component import GrupoMiembroComponent

class GrupoMiembroService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_grupo', type=int, required=True, help="ID del grupo es requerido")
        parser.add_argument('id_usuario', type=int, required=True, help="ID del usuario es requerido")
        parser.add_argument('rol', type=str, required=True, help="El rol es requerido")

        args = parser.parse_args()

        result = GrupoMiembroComponent.agregar_miembro(
            args['id_grupo'],
            args['id_usuario'],
            args['rol']
        )

        if result['result']:
            return {
                'message': result['message'],
                'data': result['data']
            }, 201
        else:
            return {
                'message': result['message'],
                'data': None
            }, 500
