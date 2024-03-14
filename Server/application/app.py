from flask import Flask
from application.blueprints.routes import api

app = Flask(__name__)
app.register_blueprint(api)

@app.errorhandler(Exception)
def handle_exception(e):
    return "I am a teapot", 418