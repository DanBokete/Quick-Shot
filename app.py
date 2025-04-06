from flask import (
    Flask,
    flash,
    g,
    redirect,
    request,
    send_from_directory,
    session,
    url_for,
    render_template,
    session,
    abort,
)
from database import close_db, get_db
import flask
import requests
from flask_session import Session

# from query import get_average_rating
from werkzeug.security import generate_password_hash, check_password_hash
from flask_session import Session
import os
from functools import wraps

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SESSION_PERMANENT"] = False
app.config["SECRET_KEY"] = (
    "50e5c6e09a9e67f98a25da2c2f51fe01aa47b28779a9a83874c8b75e3decbaee"
)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/play")
def game():
    return render_template("game.html")


@app.route("/guide")
def guide():
    return render_template("guide.html")
