from flask_webpackext import FlaskWebpackExt
from flask import Flask, render_template, send_from_directory

from api.v1.basic import basic_route

app = Flask(__name__, static_url_path='')
apiRoute = '/api/v1'

app.config.update(
  DEBUG=True,
  WEBPACKEXT_MANIFEST_PATH='/home/app-user/app/webkit-build/manifest.json'
)

FlaskWebpackExt(app)

@app.route('/dist/<path:path>')
def send_js(path):
    return send_from_directory('webkit-build', path)

@app.route('/')
@app.route('/<section>')
def home(section="top"):
  return render_template('app.html', section=section)

# Register REST API routes
app.register_blueprint(basic_route, url_prefix=apiRoute)
