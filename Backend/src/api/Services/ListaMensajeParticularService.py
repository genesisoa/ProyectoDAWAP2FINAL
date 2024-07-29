from flask_restful import Resource, reqparse
from ..Components.ListaMensajeParticularComponent import ListaMensajesParticularesComponent
from ...utils.general.response import internal_response

class ListaMensajesParticularesService(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id_emisor', type=int, required=True, help='ID del emisor del mensaje')
        self.parser.add_argument('id_receptor', type=int, required=True, help='ID del receptor del mensaje')

    def get(self):
        args = self.parser.parse_args()
        id_emisor = args['id_emisor']
        id_receptor = args['id_receptor']

        response = ListaMensajesParticularesComponent.obtener_mensajes(id_emisor, id_receptor)
        return internal_response(response['result'], response['data'], response['message'])
