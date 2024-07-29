import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor
import logging

from ..general.config import Parametros
from ..general.logs import HandleLogs
from ..general.response import internal_response


def conn_db():
    return psycopg2.connect(
        host=Parametros.db_host,
        port=int(Parametros.db_port),
        user=Parametros.db_user,
        password=Parametros.db_pass,
        database=Parametros.db_name,
        cursor_factory=RealDictCursor
    )


class DataBaseHandle:
    # Ejecuta métodos de tipo SELECT
    @staticmethod
    def getRecords(query, tamanio, record=()):
        try:
            result = False
            message = None
            data = None

            conn = conn_db()
            cursor = conn.cursor()
            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            # Tamaño: 0 (todos), 1 (uno), > 1 (n registros)
            if tamanio == 0:
                data = cursor.fetchall()
            elif tamanio == 1:
                data = cursor.fetchone()
            else:
                data = cursor.fetchmany(tamanio)

            result = True
        except Exception as ex:
            HandleLogs.write_error(ex)
            message = str(ex)
        finally:
            cursor.close()
            conn.close()
            return {'result': result, 'data': data, 'message': message}

    # Ejecuta métodos de tipo INSERT-UPDATE-DELETE
    @staticmethod
    def ExecuteNonQuery(query, record):
        try:
            result = False
            message = None
            data = None
            conn = conn_db()
            cursor = conn.cursor()
            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            if query.strip().upper().startswith('INSERT'):
                cursor.execute('SELECT LASTVAL()')
                ult_id = cursor.fetchone()['lastval']
                conn.commit()
                data = ult_id
            elif query.strip().upper().startswith('UPDATE'):
                conn.commit()
                data = cursor.rowcount
            elif query.strip().upper().startswith('DELETE'):
                conn.commit()
                data = cursor.rowcount
            else:
                conn.commit()
                data = 0
            result = True
        except Exception as ex:
            HandleLogs.write_error(ex)
            message = str(ex)
        finally:
            cursor.close()
            conn.close()
            return internal_response(result, data, message)