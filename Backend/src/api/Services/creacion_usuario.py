from flask_restful import Resource, reqparse
from ..Components.creacionusuario_component import CreacionUsuarioComponent

class UserCreationService(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('nombre', type=str, required=True, help="Nombre no puede estar vacío")
        parser.add_argument('apellido', type=str, required=True, help="Apellido no puede estar vacío")
        parser.add_argument('correo', type=str, required=True, help="Correo no puede estar vacío")
        parser.add_argument('contrasena', type=str, required=True, help="Contraseña no puede estar vacía")
        parser.add_argument('fecha_nacimiento', type=str, required=False)
        parser.add_argument('biografia', type=str, required=False)
        parser.add_argument('id_carrera', type=int, required=False)
        parser.add_argument('usuario', type=str, required=True, help="Usuario no puede estar vacío")
        parser.add_argument('foto_perfil', type=str, required=False)

        args = parser.parse_args()

        result = CreacionUsuarioComponent.create_user(
            args['nombre'],
            args['apellido'],
            args['correo'],
            args['contrasena'],
            args['usuario'],
            args.get('fecha_nacimiento'),
            args.get('biografia'),
            args.get('foto_perfil', 'default.jpg'),
            args.get('id_carrera')
        )

        return result
