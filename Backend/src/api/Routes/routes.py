from ws_dawa.src.api.Services.login_service import LoginService
from ..Services.creacion_usuario import UserCreationService
from ..Services.carreras_service import CarreraService
from ..Services.creacionpubli_servic import PubliCreationService
from ..Services.listPubli_service import listPubliService
from ..Services.usuario_service import ByIDService
from ..Services.GrupoCreationService import GrupoCreationService
from ..Services.HistoriaCreationService import HistoriaCreationService
from ..Services.ComentarioCreationService import ComentarioCreationService
from ..Services.CreacionPubliGrupoService import PublicacionGrupoCreationService
from  ..Services.creacionamistadService import AmistadService
from ..Services.Creacion_Reaccion_service import ReaccionService
from ..Services.CreacionMiembroGruoService import GrupoMiembroService
from ..Services.ActualizaUsuarioService import UsuarioService
from ..Services.UsuarioEliminarService import UsuarioEliminarService
from ..Services.ReaccionActualizarService import ReaccionActualizarService
from ..Services.AmistadActualizarService import AmistadActualizarService
from ..Services.ActualizarPublicacionServie import PublicacionActualizarService
from ..Services.ActualizarComentarioService import ComentarioActualizarService
from ..Services.EliminarPublicacionService import PublicacionEliminarService
from ..Services.EliminarComentarioService import ComentarioEliminarService
from ..Services.ListaUsuarioService import listUsuarioService
from ..Services.ListaAmigosAceptado import ListUsuarioAceptadoService
from ..Services.PublicacionesPorCarreraService import PublicacionesPorCarreraService
from ..Services.ListaComentarioPublicacion import ComentariosPorPublicacionService
from ..Services.ObtenerNombreService import ByNombreService
from ..Services.ContarReaccionServic import ReaccionConteoService
from ..Services.ListaGrupoService import listGrupoService
from ..Services.ChatInsertarService import MensajeService
from ..Services.HistorialChatGrupSERV import MensajeVerService
from ..Services.MensajesPorCarreraService import MensajesPorCarreraService
from ..Services.ListaUsuarioByIdService import ListaUsuarioByIDService
from ..Services.PublicacionUsuarioService import PublicacionesPorUsuarioService
from ..Services.MensajeParicularService import MensajesParticularesService
from ..Services.ListaMensajeParticularService import ListaMensajesParticularesService
from ..Services.BusquedaPublicacionService import BuscarPublicacionesService

def load_routes(api):
    api.add_resource(listUsuarioService, '/usuario/list')
    api.add_resource(LoginService, '/security/login')
    api.add_resource(UserCreationService, '/usuarios/create')
    api.add_resource(CarreraService, '/carreras/List')
    api.add_resource(PubliCreationService, '/publicacion/create')
    api.add_resource(ByIDService, '/usuario/id/<string:username>')
    api.add_resource(listPubliService, '/list/publicaciones')
    api.add_resource(listGrupoService, '/list/grupos')
    api.add_resource(GrupoCreationService, '/grupo/create')
    api.add_resource(HistoriaCreationService, '/historia/create')
    api.add_resource(ComentarioCreationService, '/comentario/create')
    api.add_resource(PublicacionGrupoCreationService, '/publicacion/grupo/create')
    api.add_resource(AmistadService, '/amistad/create')
    api.add_resource(ReaccionService, '/reaccion/create')
    api.add_resource(GrupoMiembroService, '/grupo_miembro/agregar')
    api.add_resource(UsuarioService, '/usuario/actualizar')
    api.add_resource(UsuarioEliminarService, '/usuario/actualizarEstado')
    api.add_resource(ReaccionActualizarService, '/reaccion/actualizar')
    api.add_resource(AmistadActualizarService, '/amistad/update')
    api.add_resource(PublicacionActualizarService, '/publicacion/update')
    api.add_resource(ComentarioActualizarService, '/comentario/update')
    api.add_resource(PublicacionEliminarService, '/publicacion/<int:id>/delete')
    api.add_resource(ComentarioEliminarService, '/comentario/<int:id>/delete')
    api.add_resource(ListUsuarioAceptadoService, '/usuarios/aceptados/<int:user_id>')
    api.add_resource(PublicacionesPorCarreraService, '/publicaciones/carrera/<int:user_id>')
    api.add_resource(ComentariosPorPublicacionService, '/api/comentarios/<int:post_id>')
    api.add_resource(ByNombreService, '/api/usuarios/<int:user_id>')
    api.add_resource(ReaccionConteoService, '/reaccion/conteo')
    api.add_resource(MensajeService, '/mensajes/agregar')
    api.add_resource(MensajeVerService, '/mensajes/<int:id_grupo>')
    api.add_resource(MensajesPorCarreraService, '/mensajes/carrera/<int:user_id>')
    api.add_resource(ListaUsuarioByIDService, '/api/Litsausuarios/<int:user_id>')
    api.add_resource(PublicacionesPorUsuarioService, '/publicaciones/usuario/<int:user_id>')
    api.add_resource(MensajesParticularesService, '/api/mensajes_particulares')
    api.add_resource(ListaMensajesParticularesService, '/mensajes_particulares')
    api.add_resource(BuscarPublicacionesService, '/api/publicaciones/buscar')


