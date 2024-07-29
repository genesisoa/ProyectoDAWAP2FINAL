from flask_restful import Resource, reqparse
from ..Components.MensajesParticularesComponent import MensajesParticularesComponent
from ...utils.general.response import internal_response

class MensajesParticularesService(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id_emisor', type=int, required=True, help='ID del emisor del mensaje')
        self.parser.add_argument('id_receptor', type=int, required=True, help='ID del receptor del mensaje')
        self.parser.add_argument('contenido', type=str, required=True, help='Contenido del mensaje')

    def post(self):
        args = self.parser.parse_args()
        id_emisor = args['id_emisor']
        id_receptor = args['id_receptor']
        contenido = args['contenido']

        response = MensajesParticularesComponent.insertar_mensaje(id_emisor, id_receptor, contenido)
        return internal_response(response['result'], response['data'], response['message'])
