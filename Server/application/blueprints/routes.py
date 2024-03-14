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
        cookie = request.headers.get("Cookie")
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
        cookie = request.headers.get("Cookie")
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
        cookie = request.headers.get("Cookie")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            # get the body as json
            body = request.json
            # get the skills from the body
            skills = body.get("skills")
            resp = jsonify({"skills": skills})
            return resp
        else:
            resp = jsonify({"error": "Not logged in"})
            return resp
    else:
        # get cookie from header
        cookie = request.headers.get("Cookie")
        # check if the cookie is valid
        if cookie and auth_cookie(cookie):
            resp = jsonify({"logged": True})
            return resp
        else:
            resp = jsonify({"logged": False})
            return resp