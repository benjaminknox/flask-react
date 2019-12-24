from flask import Blueprint, render_template, jsonify

basic_route = Blueprint('basic_route', __name__)

@basic_route.route('/basic')
def basic():
    return jsonify({'header':'Hello World!!!!!!!', 'body': 'Called by react from the flask API.', 'tag': 'Now with Materiaul UI'})
