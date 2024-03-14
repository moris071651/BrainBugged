from Crypto.Cipher import AES
import pymysql
from base64 import b64encode, b64decode
from Crypto.Random import get_random_bytes
from Crypto.Util.number import getPrime
from Crypto.Util.number import bytes_to_long, long_to_bytes
import hashlib
from Crypto import Random
from dotenv import load_dotenv
import os

load_dotenv()
pwd = os.getenv("DB_PASSWORD")

# connect to db:
def connect():
    conn = pymysql.connect(
        host="mysql-925bda8-codo1.a.aivencloud.com",
        user="avnadmin",
        password=pwd,
        database="defaultdb",
        port=17734
    )

    cursor = conn.cursor()

    # create table:
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), name VARCHAR(255))")
    cursor.execute("CREATE TABLE IF NOT EXISTS sess_keys (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), n TEXT, aes TEXT, iv TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS skills (id INT AUTO_INCREMENT PRIMARY KEY, skills TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS user_skills (id_user INT, id_skills INT, FOREIGN KEY (id_user) REFERENCES users(id), FOREIGN KEY (id_skills) REFERENCES skills(id)")
    # clear all the tables:
    # cursor.execute("DELETE FROM users")
    # cursor.execute("DELETE FROM sess_keys")
    conn.commit()
    return cursor, conn



def sign(message, n="00", iv="00", key="00"):
    #generate rsa key
    n, iv, key = int(n, 16), int(iv, 16), int(key, 16)
    if n == 0:
        p = getPrime(1024)
        q = getPrime(1024)
        n = p*q
    e = 65537
    message = message.encode()
    message = bytes_to_long(message)
    rsa = pow(message, e, n)
    rsa = long_to_bytes(rsa)
    #encrypt the rsa key with aes
    if iv == 0:
        iv = Random.new().read(AES.block_size)
    else:
        iv = long_to_bytes(iv)
    if key == 0:
        key = Random.new().read(16)
    else:
        key = long_to_bytes(key)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    sign = cipher.encrypt(rsa)
    key = bytes_to_long(key)
    iv = bytes_to_long(iv)
    n, key, iv = hex(n), hex(key), hex(iv)
    return sign, iv, key, n

def save_keys(user, n, key, iv):
    cursor, conn = connect()
    #check if they exist and update or else create
    cursor.execute(f"SELECT * FROM sess_keys WHERE user=%s", (user))
    # print n from sess_keys
    keys = cursor.fetchall()

    if len(keys) == 0:
        cursor.execute(f"INSERT INTO sess_keys (user, n, aes, iv) VALUES (%s, %s, %s, %s)", (user, n, key, iv))
    else:
        cursor.execute(f"UPDATE sess_keys SET n=%s, aes=%s, iv=%s WHERE user=%s", (n, key, iv, user))
    conn.commit()

def get_keys(user):
    cursor, conn = connect()
    cursor.execute(f"SELECT * FROM sess_keys WHERE user=%s", (user))
    keys = cursor.fetchall()
    if len(keys) == 0:
        return "00", "00", "00"
    return keys[0][2], keys[0][3], keys[0][4]

def user_exists(username):
    cursor, conn = connect()
    cursor.execute(f"SELECT * FROM users WHERE username=%s", (username))
    users = cursor.fetchall()
    if len(users) == 0:
        return False
    return True

def create_user(username, password, email, name):
    cursor, conn = connect()
    password = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute(f"INSERT INTO users (username, password, email, name) VALUES (%s, %s, %s, %s)", (username, password, email, name))
    conn.commit()

def encrypt_base(msg):
    msg = b64encode(msg)
    return msg

def decrypt_base(msg):
    msg = b64decode(msg)
    return msg

def check_pass(username, password):
    cursor, conn = connect()
    password = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute(f"SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    users = cursor.fetchall()
    if len(users) == 0:
        return False
    return True

def put_skills(username, skills):
    #get the id of the user
    cursor, conn = connect()
    id_user = cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    #get the id of the skills
    for skill in skills:
        cursor.execute(f"SELECT id FROM skills WHERE skills=%s", (skill))
        id_skill = cursor.fetchall()
        if len(id_skill) == 0:
            cursor.execute(f"INSERT INTO skills (skills) VALUES (%s)", (skill))
            id_skill = cursor.execute(f"SELECT id FROM skills WHERE skills=%s", (skill))
        check = cursor.execute(f"SELECT * FROM user_skills WHERE id_user=%s AND id_skills=%s", (id_user, id_skill))
        if len(check) == 0:
            cursor.execute(f"INSERT INTO user_skills (id_user, id_skills) VALUES (%s, %s)", (id_user, id_skill))
    conn.commit()

def get_skills(username):
    pass

