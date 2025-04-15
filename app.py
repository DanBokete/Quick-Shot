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

from forms import LeaderboardForm, LoginForm, RegistrationForm

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SESSION_PERMANENT"] = False
app.config["SECRET_KEY"] = (
    "50e5c6e09a9e67f98a25da2c2f51fe01aa47b28779a9a83874c8b75e3decbaee"
)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.before_request
def load_logged_in_user():
    g.user = session.get("user_id")

    if not g.user:
        return


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/play", methods=["POST", "GET"])
def game():
    if request.method == "POST":
        if "user_id" not in session:
            return "You are not signed in, attempt not recorded 😪"

        user_id = session.get("user_id")
        score = int(request.form.get("score"))
        cheated = int(request.form.get("cheated"))

        db = get_db()
        try:
            print(score, cheated)
            db.execute(
                """
                INSERT INTO leaderboard
                (user_id, score, cheated)
                VALUES (?, ?, ?);
                """,
                (user_id, score, cheated),
            )
            db.commit()
        except:
            return "Something went wrong ⚠️"

        return "successfully recorded attempt 👏"

    return render_template("game.html")


@app.route("/guide")
def guide():
    return render_template("guide.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data.strip()
        password = form.password.data

        db = get_db()

        does_username_exist = db.execute(
            """
            SELECT *
            FROM users
            WHERE username = ?
            """,
            (username,),
        ).fetchone()

        if does_username_exist:
            form.username.errors.append("User already exists")
        else:
            db.execute(
                """
                INSERT INTO users
                (username, password)
                VALUES (?, ?);
                """,
                (
                    username,
                    generate_password_hash(password),
                ),
            )
            db.commit()
            return redirect(url_for("login"))

    return render_template("signup.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        db = get_db()

        user = db.execute(
            """
            SELECT *
            FROM users
            WHERE username = ?
            """,
            (username,),
        ).fetchone()

        if not user:
            form.username.errors.append("User does not exist")
        elif not check_password_hash(user["password"], password):
            form.password.errors.append("Password does not match")
        else:
            if user["is_banned"]:
                abort(403, "You have been banned")
            session["user_id"] = user["id"]
            session.modified = True

            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("index")

            return redirect(next_page)
    return render_template("login.html", form=form)


@app.route("/logout")
def logout():
    session.clear()
    session.modified
    return redirect(url_for("index"))


@app.route("/leaderboard")
def leaderboard():
    db = get_db()
    leaderboard = db.execute(
        """
        SELECT DISTINCT u.username, l.score, l.cheated, strftime('%d.%m.%Y', l.created_at) AS created_at, strftime('%H:%M', l.created_at) AS time
        FROM leaderboard AS l
        JOIN users AS u on u.id = l.user_id
        WHERE score IN (
            SELECT score
            FROM leaderboard AS ll
            WHERE ll.user_id = l.user_id
            ORDER BY ll.score DESC, ll.created_at
            LIMIT 3
        )
        
        ORDER BY l.cheated, l.score DESC
        """
    ).fetchall()

    return render_template("leaderboard.html", leaderboard=leaderboard)
