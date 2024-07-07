from Flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from models.DataBase import db
from models.User import User

users_bp = Blueprint('User', __name__)

@users_bp.route('/api/users/signup', methods=['POST'])
def signup():
    data = request.json
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Username, email, and password are required.'}), 400
    
    new_user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password)
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists.'}), 400
    
    return jsonify({'message': 'User created successfully.'}), 201

@users_bp.route('/api/users/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    user = User.query.filter_by(username=username).first()

    if user is None or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid username or password.'}), 401

    session['user_id'] = user.id
    return jsonify({'message': 'Logged in successfully.'}), 200

@users_bp.route('/api/users/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully.'}), 200