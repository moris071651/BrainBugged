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
    txt = encrypt_base(txt)
    sign1 = encrypt_base(sign1)
    cookie = f"{txt}.{sign1}"
    return cookie

def auth_cookie(cookie):
    text, sign1 = cookie.split(".")
    text = decrypt_base(text)
    username = text.split(";")[0].split("=")[1]
    if not user_exists(username):
        return False
    n, key, iv = get_keys(username)
    sign2, _, _, _ = sign(text, n, key, iv)
    sign1 = decrypt_base(sign1)
    if sign1 == sign2:
        return True
    return False

def check_password(username, password):
    return check_pass(username, password)


