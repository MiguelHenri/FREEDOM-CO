from flask import Flask
from models.DataBase import db
from config import Config
from flask_cors import CORS
from routes.items import items_bp

# Initializing app and db with configs
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)

# Initializing blueprints (routes)
app.register_blueprint(items_bp)

if __name__ == '__main__':
    app.run(debug=True)