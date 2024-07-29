from flask import request
from flask_restful import Resource
from ..Components.BusquedaComponent import BusquedaPublicacionComponent

class BuscarPublicacionesService(Resource):

    def get(self):

        palabra_clave = request.args.get('palabra_clave', '')
        if not palabra_clave:
            return {'result': False, 'message': 'No se proporcionó palabra clave', 'data': None}, 400

        response = BusquedaPublicacionComponent.buscar_publicaciones(palabra_clave)
        return response
