import sqlite3

conn = sqlite3.connect('product.db')

c = conn.cursor()
c.execute("""CREATE TABLE request(
               username varchar(20),
               LName text,
               email text,
               Subject text   
               )""")

conn.commit()
conn.close()