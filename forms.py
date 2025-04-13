from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Length, NumberRange, Optional, EqualTo


class RegistrationForm(FlaskForm):
    username = StringField("Username", [Length(min=4, max=25)])
    password = PasswordField(
        "New Password",
        [
            InputRequired(),
            EqualTo("confirm", message="Passwords must match"),
            Length(min=3),
        ],
    )
    confirm = PasswordField("Repeat Password")
    submit = SubmitField(
        "Signup!",
        render_kw={
            "class": "mt-2 px-3 py-0.5 font-medium block m-auto bg-orange-200 rounded-sm cursor-pointer"
        },
    )


class LoginForm(FlaskForm):
    username = StringField("Username", [Length(min=4, max=25)])
    password = PasswordField(
        "Password",
        [InputRequired(), Length(min=3)],
    )
    submit = SubmitField(
        "Login!",
        render_kw={
            "class": "mt-2 px-3 py-0.5 font-medium block m-auto bg-orange-200 rounded-sm cursor-pointer"
        },
    )


class LeaderboardForm(FlaskForm):
    score = IntegerField("Score", [Length(min=4, max=25)])
    cheated = BooleanField(
        "Cheated",
        [InputRequired()],
    )
