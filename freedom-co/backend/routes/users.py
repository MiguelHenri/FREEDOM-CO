from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from models.DataBase import db
from models.User import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from functools import wraps

users_bp = Blueprint('User', __name__)

# Signup route
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
        return jsonify({'message': 'Username or email already exists.'}), 409
    
    return jsonify({'message': 'User created successfully.'}), 201

# Login route
@users_bp.route('/api/users/login', methods=['POST'])
def login():
    # todo - prohibit user already logged from loggin again
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    user = User.query.filter_by(username=username).first()

    if user is None or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid username or password.'}), 401

    token = create_access_token(identity={'username': username})

    return jsonify({
        'message': 'Logged in successfully.',
        'access_token': token,
    }), 200

# Getting Auth Status route
@users_bp.route('/api/users/auth', methods=['GET'])
@jwt_required()
def auth():
    return '', 204

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
    
        username = get_jwt_identity().get('username')
        
        user = User.query.filter_by(username=username).first()
        
        if user is None or not user.is_admin:
            return jsonify({
                'message': 'You do not have permission to access this resource.'
            }), 403
        
        return f(*args, **kwargs)
    
    return decorated_function

# Getting Adm Status route
@users_bp.route('/api/users/admin', methods=['GET'])
@jwt_required()
@admin_required
def admin():
    return '', 204

@users_bp.route('/api/users', methods=['PUT'])
@jwt_required()
def update_address():
    username = get_jwt_identity().get('username')
    user = User.query.filter_by(username=username).first()

    # Ensuring user exists
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.json
    # Ensuring all fields were sent
    required_fields = ['address_line_1', 'city', 'state', 'country', 'zip_code']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'message': f'Missing required field: {field}'}), 400
        
    # Updating the address fields
    user.address_line_1 = data['address_line_1']
    user.address_line_2 = data.get('address_line_2', None),
    user.city = data['city']
    user.state = data['state']
    user.country = data['country']
    user.zip_code = data['zip_code']

    try:
        db.session.commit()
        return jsonify({'message': 'Address updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
    
@users_bp.route('/api/users', methods=['GET'])
@jwt_required()
def get_logged_user():
    username = get_jwt_identity().get('username')
    user = User.query.filter_by(username=username).first()

    # Ensuring user exists
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200