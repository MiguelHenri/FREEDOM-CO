from flask import Flask
from models.DataBase import db
from config import Config
from flask_cors import CORS
from routes.items import items_bp
from routes.users import users_bp
from routes.carts import carts_bp
from flask_jwt_extended import JWTManager
from services.jobs import cleanup_expired_reservations
from flask_apscheduler import APScheduler

# Initializing app and db with configs
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)

# JWT Token Auth
jwt = JWTManager(app)

# Scheduler
scheduler = APScheduler()

@scheduler.task("interval", id="cleanup_job", minutes=1)
def cleanup_job():
    with app.app_context():
        cleanup_expired_reservations()

scheduler.init_app(app)
scheduler.start()

# Initializing blueprints (routes)
app.register_blueprint(items_bp)
app.register_blueprint(users_bp)
app.register_blueprint(carts_bp)

if __name__ == '__main__':
    app.run(debug=True)