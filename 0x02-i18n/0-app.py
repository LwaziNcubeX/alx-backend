#!/usr/bin/env python3
"""
A simple flask app that renders a template
"""
from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def main():
    """
    Renders the home page and returns the rendered template
    :return:
    """
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run(debug=True)
