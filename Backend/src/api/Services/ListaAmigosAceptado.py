from flask_restful import Resource
from ..Components.ListaUsuariosComponent import ListaUsuariosComponent
from ..Components.ListaAceptadoAmigoComponent import ListaAmistadesComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success, response_not_found


class ListUsuarioAceptadoService(Resource):
    @staticmethod
    def get(user_id):
        try:
            HandleLogs.write_log("Ejecutando servicio de Listar USUARIOS")

            resultado = ListaUsuariosComponent.getAllUsuario()
            if not resultado['result']:
                return response_error(resultado['message'])

            amistades_resultado = ListaAmistadesComponent.getAmistadesAceptadasPorUsuario(user_id)
            if not amistades_resultado['result']:
                return response_error(amistades_resultado['message'])

            amistades_aceptadas = {am['id_usuario1'] if am['id_usuario1'] != user_id else am['id_usuario2'] for am in
                                   amistades_resultado['data']}

            usuarios_aceptados = [usuario for usuario in resultado['data'] if usuario['id'] in amistades_aceptadas]

            if usuarios_aceptados:
                return response_success(usuarios_aceptados)
            else:
                return response_not_found("No tienes amigos aceptados.")
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
