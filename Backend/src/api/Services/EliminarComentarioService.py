from flask_restful import Resource, reqparse
from ..Components.EliminarComentarioComponent import ComentarioEliminarComponent

class ComentarioEliminarService(Resource):

    def delete(self, id):
        result = ComentarioEliminarComponent.eliminar_comentario(id)

        if result['result']:
            return {
                'message': result['message']
            }, 200
        else:
            return {
                'message': result['message']
            }, 500