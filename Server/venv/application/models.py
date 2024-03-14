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
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255))")
cursor.execute("CREATE TABLE IF NOT EXISTS keys (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), n TEXT, key TEXT, iv TEXT)")
