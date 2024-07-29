from flask_restful import Resource, reqparse
from ..Components.ContarReaccionComponent import ReaccionConteoComponent

from flask_restful import Resource, reqparse

class ReaccionConteoService(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_publicacion', type=int, required=True, help="ID de la publicación es requerido", location='args')

        args = parser.parse_args()

        result = ReaccionConteoComponent.contar_reacciones(args['id_publicacion'])

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