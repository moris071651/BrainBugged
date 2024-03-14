from application.models import *

def has_user(username):
    check = user_exists(username)
    return check

def make_user(username, password, email, name):
    create_user(username, password, email, name)
    return True

def create_cookie(username):
    n, key, iv = "00", "00", "00"
    time = 60*60*24
    txt = f"name={username};time={time}"
    sign1, iv, key, n = sign(txt, n, key, iv)
    save_keys(username, n, key, iv)
    txt = txt.encode()
    txt = encrypt_base(txt)
    sign1 = encrypt_base(sign1)
    txt = txt.decode()
    sign1 = sign1.decode()
    cookie = f"{txt}.{sign1}"
    return cookie

def auth_cookie(cookie):
    print("auth_cookie")
    try:
        text, sign1 = cookie.split(".")
        text = decrypt_base(text)
        text = text.decode()
        username = text.split(";")[0].split("=")[1]
    except:
        return False
    if not user_exists(username):
        return False
    n, key, iv = get_keys(username)
    sign2, _, _, _ = sign(text, n, iv, key)
    sign1 = decrypt_base(sign1)
    if sign1 == sign2:
        return True
    return False

def check_password(username, password):
    return check_pass(username, password)

def get_user_from_cookie(cookie):
    text, _ = cookie.split(".")
    text = decrypt_base(text)
    text = text.decode()
    username = text.split(";")[0].split("=")[1]
    return username

def add_skills(cookie, skills):
    try:
        username = get_user_from_cookie(cookie)
        put_skills(username, skills)
        return True
    except:
        return False
    
def get_skills(cookie):
    try:
        username = get_user_from_cookie(cookie)
        skills = get_user_skills(username)
        return skills
    except:
        return False


