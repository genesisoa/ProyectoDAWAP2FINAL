from ws_dawa.src.utils.general.logs import HandleLogs
from ws_dawa.src.utils.general.response import internal_response
from ws_dawa.src.utils.database.connection_db import DataBaseHandle
from ..Components.jwt_component import JwtComponent

class LoginComponent:

    @staticmethod
    def Login(p_user, p_clave):
        try:
            result = False
            data = None
            message = None
            sql = "SELECT count(*) as valor FROM proyectop2.usuarios WHERE usuario = %s AND contrasena = %s AND user_state = true"
            record = (p_user, p_clave)

            resul_login = DataBaseHandle.getRecords(sql,1, record)
            if resul_login['result']:
                if resul_login['data']['valor'] > 0:
                    result = True
                    message = 'Login Exitoso'
                    #Generar un token y asignandolo a data
                    data =JwtComponent.TokenGenerate(p_user)
                    print(data)
                else:
                    message = 'Login No Válido'
            else:
                message = resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err._str_()
        finally:
            return internal_response(result, data, message)