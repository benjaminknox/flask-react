from flask import Flask, render_template
from flask_webpack import Webpack
from api.v1.basic import basic_route


app = Flask(__name__)
apiRoute = '/api/v1'

app.config.update(
  DEBUG=True,
  WEBPACK_MANIFEST_PATH='./webkit-build/manifest.json'
)

webpack = Webpack()
webpack.init_app(app)
 

@app.route('/')
@app.route('/<section>')
def home(section="top"):
  return render_template('app.html', section=section)

# Register REST API routes
app.register_blueprint(basic_route, url_prefix=apiRoute)

