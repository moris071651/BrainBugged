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
cursor.execute("CREATE TABLE IF NOT EXISTS keys (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), n TEXT, key TEXT, iv TEXT)")

conn.commit()

def sign(message, n="00", iv="00", key="00"):
    #generate rsa key
    n, iv, key = int(n, 16), int(iv, 16), int(key, 16)
    if n == 0:
        p = getPrime(1024)
        q = getPrime(1024)
        n = p*q
    e = 65537
    message = bytes_to_long(message)
    rsa = pow(message, e, n)
    rsa = long_to_bytes(rsa)
    #encrypt the rsa key with aes
    if iv == 0:
        iv = Random.new().read(AES.block_size)
    if key == 0:
        key = Random.new().read(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    sign = cipher.encrypt(rsa)
    n, key, iv = hex(n)[2:], hex(key)[2:], hex(iv)[2:]
    return sign, iv, key, n

def save_key(user, n, key, iv):
    cursor.execute(f"INSERT INTO keys (user, n, key, iv) VALUES ('{user}', '{n}', '{key}', '{iv}')")
    conn.commit()

def get_key(user):
    cursor.execute(f"SELECT * FROM keys WHERE user='{user}'")
    keys = cursor.fetchall()
    if len(keys) == 0:
        return "00", "00", "00"
    return keys[0][2], keys[0][3], keys[0][4]

def user_exists(username):
    cursor.execute(f"SELECT * FROM users WHERE username='{username}'")
    users = cursor.fetchall()
    if len(users) == 0:
        return False
    return True

def create_user(username, password, email, name):
    cursor.execute(f"INSERT INTO users (username, password, email, name) VALUES ('{username}', '{password}', '{email}', '{name}')")
    conn.commit()