print('test')

DB_HOST="ec2-34-232-191-133.compute-1.amazonaws.com"
DB_NAME="d1mm3a0c29eepo"
DB_PASS="904c29b5f6055f6de8c01b24e1ac3f29736c54ca010dd9b8cc022f1555fe3be7"
DB_USER="orikanjrgszuig"
import psycopg2
import psycopg2.extras

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)
cur = conn.cursor()

#cur.execute("CREATE TABLE student (id SERIAL PRIMARY KEY, name VARCHAR);")
#cur.execute("INSERT INTO student (name) VALUES(%s)", ("Sihle",))

#cur.execute("DELETE FROM student WHERE name='Cristina';")

cur.execute("SELECT * FROM student;")

print(cur.fetchall())

conn.commit()

cur.close()

conn.close()
