import psycopg2
from psycopg2 import errors

def connect_to_db():
    connection = psycopg2.connect('postgresql://talents_prod_db_pr38_user:gfoPIPdlJfGGZ08fZ8plPGLs1aLrygGV@dpg-cufo0glsvqrc73fs0hdg-a.frankfurt-postgres.render.com/talents_prod_db_pr38')
    cursor = connection.cursor()
    return connection, cursor