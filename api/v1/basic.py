from flask import Blueprint, render_template

basic_route = Blueprint('basic_route', __name__)

@basic_route.route('/basic')
def basic():
  return "{page:'Basic'}"
