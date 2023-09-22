from flask import Flask, render_template, send_from_directory
from flask_static_digest import FlaskStaticDigest
from database import db_session

from api.v1.basic import basic_route

flask_static_digest = FlaskStaticDigest()

app = Flask(__name__, static_url_path='/static')
apiRoute = '/api/v1'

app.config.update(
  DEBUG=True,
)

flask_static_digest.init_app(app)

@app.route('/dist/<path:path>')
def send_js(path):
    return send_from_directory('webkit-build', path)

@app.route('/')
@app.route('/<section>')
def home(section="top"):
  return render_template('app.html', section=section)

# Register REST API routes
app.register_blueprint(basic_route, url_prefix=apiRoute)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
