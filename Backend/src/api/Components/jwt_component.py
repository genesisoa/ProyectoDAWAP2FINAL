from ...utils.general.config import Parametros
from ...utils.general.logs import HandleLogs
from datetime import datetime, timedelta
import pytz
import jwt

class JwtComponent:
    @staticmethod
    def TokenGenerate(p_user):
        try:
            timezone = pytz.timezone('America/Guayaquil')
            payload = {
                'iat': datetime.now(tz=timezone),
                'exp': datetime.now(tz=timezone) + timedelta(minutes=15),
                'username': p_user
            }
            return jwt.encode(payload, Parametros.secret_jwt, algorithm='HS256')

        except Exception as err:
            HandleLogs.write_log("Error al generar el token")
            HandleLogs.write_error(str(err))
            return None

    @staticmethod
    def TokenValidate(token):
        try:
            jwt.decode(token, Parametros.secret_jwt, algorithms=['HS256'])
            return True
        except jwt.ExpiredSignatureError:
            HandleLogs.write_log("Token expirado")
        except jwt.InvalidTokenError:
            HandleLogs.write_log("Token inválido")
        except Exception as err:
            HandleLogs.write_log("Error al validar el token")
            HandleLogs.write_error(str(err))
        return False

    @staticmethod
    def decode_token(token):
        try:
            return jwt.decode(token, Parametros.secret_jwt, algorithms=['HS256'])
        except Exception as err:
            HandleLogs.write_log("Error al decodificar el token")
            HandleLogs.write_error(str(err))
            return {}
