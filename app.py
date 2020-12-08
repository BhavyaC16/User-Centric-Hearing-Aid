import os, json
from glob import glob
from flask import Flask, request, redirect, render_template, url_for, jsonify
from os.path import join, dirname
import requests

port = int(os.environ.get("PORT",5000))

app = Flask(__name__)
app.secret_key = "secret key"

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to avoid caching the rendered page (max-age=0).
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/home')
def menu_home():
    return render_template('bookmarks.html')

@app.route('/learnmore')
def learnmore():
    return render_template('learnmore.html')

@app.route('/contact')
def contactus():
    return render_template('contact.html')

# @app.route('/login')
# def login():
#     return render_template('login.html')

@app.route('/player')
def player():
    return render_template('player.html')

@app.route('/help')
def help():
    return render_template('onboarding.html')


if __name__ == "__main__":
    app.run(debug=True)
