#!/usr/bin/env python3
"""
A simple flask app that renders a template
"""
from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)


class Config(object):
    """
    class Config to store languages and other data
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """
    returns the selected language
    :return:
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def main():
    """
    Renders the home page and returns the rendered template
    :return:
    """
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run(debug=True)
