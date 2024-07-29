from flask_restful import Resource, reqparse
from ..Components.EliminacionPublicacionComponent import PublicacionEliminarComponent

class PublicacionEliminarService(Resource):

    def delete(self, id):
        result = PublicacionEliminarComponent.eliminar_publicacion(id)

        if result['result']:
            return {
                'message': result['message']
            }, 200
        else:
            return {
                'message': result['message']
            }, 500