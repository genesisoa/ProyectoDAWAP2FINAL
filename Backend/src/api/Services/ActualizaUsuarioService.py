from flask_restful import Resource, reqparse
from ..Components.ActualizarUsuarioComponent import UsuarioComponent

class UsuarioService(Resource):

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario', type=int, required=True, help="ID del usuario es requerido")
        parser.add_argument('nombre', type=str)
        parser.add_argument('apellido', type=str)
        parser.add_argument('correo', type=str)
        parser.add_argument('contrasena', type=str)
        parser.add_argument('fecha_nacimiento', type=str)
        parser.add_argument('biografia', type=str)
        parser.add_argument('usuario', type=str)
        parser.add_argument('id_carrera', type=int)

        args = parser.parse_args()

        result = UsuarioComponent.actualizar_usuario(
            args['id_usuario'],
            nombre=args.get('nombre'),
            apellido=args.get('apellido'),
            correo=args.get('correo'),
            contrasena=args.get('contrasena'),
            fecha_nacimiento=args.get('fecha_nacimiento'),
            biografia=args.get('biografia'),
            usuario=args.get('usuario'),
            id_carrera=args.get('id_carrera')
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
