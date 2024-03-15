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
    
def get_user(cookie):
    try:
        username = get_user_from_cookie(cookie)
        data = get_user_data(username)
        return data
    except:
        return False
    
def get_skills(cookie):
    try:
        username = get_user_from_cookie(cookie)
        skills = get_user_skills(username)
        return skills
    except:
        return False
    
def create_project(cookie, project):
    try:
        username = get_user_from_cookie(cookie)
        description = project.get("description")
        skills = project.get("skills")
        title = project.get("title")
        team_description = project.get("team_description")
        if put_project(title, description, team_description, skills, username):
            return True
        else:
            return False
    except:
        return False
    
def get_projects(cookie):
    try:
        username = get_user_from_cookie(cookie)
        projects = []
        for project in get_projects_owned(username):
            projects.append(project)
        for project in get_enrolled_projects(username):
            projects.append(project)
        return projects
    except:
        return False
    
def enroll_project(cookie, title):
    try:
        username = get_user_from_cookie(cookie)
        if put_enroll(username, title):
            return True
        else:
            return False
    except:
        return False

def get_project_percent_list(cookie):
    try:
        username = get_user_from_cookie(cookie)
        projects = get_projects_except_owned(username)
        user_skills = get_user_skills(username)
        project_percentage = get_percentage_list(projects, user_skills)
        project_percentage = find_max_precentages(project_percentage)
        return project_percentage
    except:
        return False
    
def gat_ai_data(title):
    data = check_ai_data(title)
    if data:
        return data
    else:
        data = get_AI_responce(title)
        update_ai_data(title, data)
        return data

