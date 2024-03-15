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
import json

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

    #wipe all the tables:
    # cursor.execute("DROP TABLE IF EXISTS enrolled_projects")
    # cursor.execute("DROP TABLE IF EXISTS owner_projects")
    # cursor.execute("DROP TABLE IF EXISTS project_skills")
    # cursor.execute("DROP TABLE IF EXISTS projects")
    # cursor.execute("DROP TABLE IF EXISTS user_skills")
    # cursor.execute("DROP TABLE IF EXISTS skills")
    # cursor.execute("DROP TABLE IF EXISTS users")
    # cursor.execute("DROP TABLE IF EXISTS sess_keys")
    
    
    
    
    
    
    # conn.commit()

    # # create table:
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), name VARCHAR(255))")
    cursor.execute("CREATE TABLE IF NOT EXISTS sess_keys (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), n TEXT, aes TEXT, iv TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS skills (id INT AUTO_INCREMENT PRIMARY KEY, skill TEXT)")
    # cursor.execute("CREATE TRIGGER IF NOT EXISTS stop_delete_skills BEFORE DELETE ON skills FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You cannot delete skills'; END")
    cursor.execute("CREATE TABLE IF NOT EXISTS user_skills (id INT AUTO_INCREMENT PRIMARY KEY, id_user INT, id_skills INT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS projects (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, team_description TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS project_skills (id INT AUTO_INCREMENT PRIMARY KEY, id_project INT, id_skills INT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS owner_projects (id INT AUTO_INCREMENT PRIMARY KEY, id_owner INT, id_project INT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS enrolled_projects (id INT AUTO_INCREMENT PRIMARY KEY, id_enrolled INT, id_project INT)")

    #test: insert int skills if not already there skill - testus
    # clear all the tables:
    # cursor.execute("DELETE FROM users")
    # cursor.execute("DELETE FROM sess_keys")
    # cursor.execute("DELETE FROM skills")
    # cursor.execute("DELETE FROM user_skills")
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
    cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    id_user = cursor.fetchone()
    id_user = id_user[0]
    #get the id of the skills
    for skill in skills:
        cursor.execute(f"SELECT id FROM skills WHERE skill=%s", (skill))
        id_skill = cursor.fetchone()
        # print("Skill: %s, id: %s" % (skill, id_skill))
        if not id_skill:
            # print("inserting")
            cursor.execute(f"INSERT INTO skills (skill) VALUES (%s)", (skill))
            cursor.execute(f"SELECT id FROM skills WHERE skill=%s", (skill))
            id_skill = cursor.fetchone()
            id_skill = id_skill[0]
            # print("id_skill: ", id_skill)
        else:
            id_skill = id_skill[0]
            # print("id_skill: ", id_skill)
        cursor.execute(f"SELECT * FROM user_skills WHERE id_user=%s AND id_skills=%s", (id_user, id_skill))
        check = cursor.fetchone()
        if not check:
            try:
                cursor.execute(f"INSERT INTO user_skills (id_user, id_skills) VALUES (%s, %s)", (id_user, id_skill))
            except Exception as e:
                print(e)
    conn.commit()

def get_user_skills(username):
    cursor, conn = connect()
    cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    id_user = cursor.fetchone()
    id_user = id_user[0]
    cursor.execute(f"SELECT id_skills FROM user_skills WHERE id_user=%s", (id_user))
    skills_ids = cursor.fetchall()
    if len(skills_ids) == 0:
        return False
    skills = []
    skills_ids = [id[0] for id in skills_ids]
    for id in skills_ids:
        cursor.execute(f"SELECT skill FROM skills WHERE id=%s", (id))
        skill = cursor.fetchone()
        skills.append(skill[0])
    return skills

def put_project(title, description, team_description, skills, username):
    cursor, conn = connect()
    cursor.execute(f"SELECT * FROM projects WHERE title=%s", (title))
    check = cursor.fetchall()
    if check:
        return False
    cursor.execute(f"INSERT INTO projects (title, description, team_description) VALUES (%s, %s, %s)", (title, description, team_description))
    cursor.execute(f"SELECT id FROM projects WHERE title=%s", (title))
    id_project = cursor.fetchone()
    id_project = id_project[0]
    cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    id_owner = cursor.fetchone()
    id_owner = id_owner[0]
    cursor.execute(f"INSERT INTO owner_projects (id_owner, id_project) VALUES (%s, %s)", (id_owner, id_project))
    for skill in skills:
        cursor.execute(f"SELECT id FROM skills WHERE skill=%s", (skill))
        id_skill = cursor.fetchone()
        if not id_skill:
            cursor.execute(f"INSERT INTO skills (skill) VALUES (%s)", (skill))
            cursor.execute(f"SELECT id FROM skills WHERE skill=%s", (skill))
            id_skill = cursor.fetchone()
            id_skill = id_skill[0]
        else:
            id_skill = id_skill[0]
        cursor.execute(f"INSERT INTO project_skills (id_project, id_skills) VALUES (%s, %s)", (id_project, id_skill))
    conn.commit()
    return True

def get_projects_owned(username):
    cursor, conn = connect()
    cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    id_user = cursor.fetchone()
    id_user = id_user[0]
    cursor.execute(f"SELECT id_project FROM owner_projects WHERE id_owner=%s", (id_user))
    projects = cursor.fetchall()
    projects = [project[0] for project in projects]
    titles = []
    for proj in projects:
        cursor.execute(f"SELECT title FROM projects WHERE id=%s", (proj))
        proj = cursor.fetchone()
        print(proj)
        titles.append(proj[0])
    return titles

def put_enroll(username, title):
    cursor, conn = connect()
    cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    id_user = cursor.fetchone()
    id_user = id_user[0]
    cursor.execute(f"SELECT id FROM projects WHERE title=%s", (title))
    id_project = cursor.fetchone()
    id_project = id_project[0]
    cursor.execute(f"INSERT INTO enrolled_projects (id_enrolled, id_project) VALUES (%s, %s)", (id_user, id_project))
    conn.commit()

def get_enrolled_projects(username):
    cursor, conn = connect()
    cursor.execute(f"SELECT id FROM users WHERE username=%s", (username))
    id_user = cursor.fetchone()
    id_user = id_user[0]
    cursor.execute(f"SELECT id_project FROM enrolled_projects WHERE id_enrolled=%s", (id_user))
    projects = cursor.fetchall()
    projects = [project[0] for project in projects]
    titles = []
    for proj in projects:
        cursor.execute(f"SELECT title FROM projects WHERE id=%s", (proj))
        proj = cursor.fetchone()
        titles.append(proj[0])
    return titles

def get_percentage(project_skills, user_skills):
    percentage = 0
    base = len(project_skills)
    for skill in project_skills:
        if skill in user_skills:
            percentage += 1
    percentage = (percentage/base)*100
    return percentage

def find_max_precentages(all_precetages):
    all_precetages = [json.loads(x) for x in all_precetages if json.loads(x)["percentage"] > 40]
    all_precetages = sorted(all_precetages, key=lambda x: x["percentage"], reverse=True)
    return all_precetages

def get_percentage_list(all_projects, user_skills):
    cursor, conn = connect()
    all_precetages = []
    for project in all_projects:
        cursor.execute(f"SELECT id FROM projects WHERE title=%s", (project))
        id_project = cursor.fetchone()
        id_project = id_project[0]
        cursor.execute(f"SELECT id_skills FROM project_skills WHERE id_project=%s", (id_project))
        skills_ids = cursor.fetchall()
        skills_ids = [id[0] for id in skills_ids]
        skills = []
        for id in skills_ids:
            cursor.execute(f"SELECT skill FROM skills WHERE id=%s", (id))
            skill = cursor.fetchone()
            skills.append(skill[0])
        percentage = get_percentage(skills, user_skills)
        all_precetages.append(json.dumps({"title": project, "percentage": percentage}))
    return all_precetages