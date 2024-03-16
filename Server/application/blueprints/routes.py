from flask import *
from application.utils import *

api = Blueprint("api", __name__)

@api.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        # get the body as json
        body = request.json
        username = body.get("username")
        password = body.get("password")
        email = body.get("email")
        name = body.get("name")
        # check if the user already exists
        if has_user(username):
            resp = jsonify({"error": "User already exists"})
            return resp
        make_user(username, password, email, name)
        # create the cookie
        cookie = create_cookie(username)
        resp = jsonify({"cookie": cookie})
        return resp
    else:
        # get cookie from header
        cookie = request.headers.get("Authentication")
        print(cookie)
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            resp = jsonify({"logged": True})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
        
@api.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        # get the body as json
        body = request.json
        username = body.get("username")
        password = body.get("password")
        # check if the user exists
        if not has_user(username):
            resp = jsonify({"error": "User does not exist"})
            return resp
        # check if the password is correct
        if check_password(username, password):
            # create the cookie
            cookie = create_cookie(username)
            resp = jsonify({"cookie": cookie})
            return resp
        else:
            resp = jsonify({"error": "Incorrect password"})
            return resp
    else:
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            resp = jsonify({"logged": True})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
    

@api.route("/skills", methods=["POST", "GET"])
def skills():
    if request.method == "POST":
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            # get the body as json
            body = request.json
            # get the skills from the body
            skills = body.get("skills")
            add_skills(cookie, skills)
            resp = jsonify({"added": True})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
    else:
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            skills_of_user = get_skills(cookie)
            #make to json array with id skills
            resp = jsonify({"skills": skills_of_user})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
        
@api.route("/projects", methods=["POST", "GET"])
def projects():
    if request.method == "POST":
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            # get the body as json
            body = request.json
            # create the project
            if create_project(cookie, body):
                resp = jsonify({"created": True})
            else:
                resp = jsonify({"created": False})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
    else:
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            # get the projects of the user
            projects_of_user = get_projects(cookie)
            #make to json array with id projects
            resp = jsonify({"projects": projects_of_user})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
        
@api.route("/enroll", methods=["POST", "GET"])
def enroll():
    if request.method == "POST":
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            # get the body as json
            body = request.json
            # enroll the user in the project
            if enroll_project(cookie, body.get("title")):
                resp = jsonify({"enrolled": True})
            else:
                resp = jsonify({"enrolled": False})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
    else:
        # get cookie from header
        cookie = request.headers.get("Authentication")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            # get the projects of the user
            projects_percentage = get_project_percent_list(cookie)
            #make to json array with id projects
            resp = jsonify({"projects": projects_percentage})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp
        
@api.route("/user", methods=["GET"])
def user():
    # get cookie from header
    cookie = request.headers.get("Authentication")
    # check if the cookie is valid
    if cookie and auth_cookie(cookie):
        # get the user data
        user_data = get_user(cookie)
        resp = jsonify({"data": user_data})
        return resp
    else:
        resp = jsonify({"logged": False})
        return resp
    
@api.route("/ai_data", methods=["POST"])
def ai_data():
    # get the body as json
    body = request.json
    # get the data from the AI
    data = gat_ai_data(body.get("title"))
    resp = jsonify({"ai_short_description": data[0], "ai_points": [test for test in data[1].split("\n")[::2]], "ai_help": data[2]})
    return resp

@api.route("/all_skills", methods=["GET"])
def all_skills():
    # get all the skills
    skills = get_all_skills()
    resp = jsonify({"skills": skills})
    return resp