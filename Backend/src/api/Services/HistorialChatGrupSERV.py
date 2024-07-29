from flask_restful import Resource
from ..Components.HistorialMensajesGrupoCOM import MensajeComponent

class MensajeVerService(Resource):
    def get(self, id_grupo):
        result = MensajeComponent.obtener_mensajes(id_grupo)
        if result['result']:
            return {
                'message': 'Mensajes obtenidos exitosamente',
                'data': result['data']
            }, 200
        else:
            return {
                'message': result['message'],
                'data': None
            }, 500
