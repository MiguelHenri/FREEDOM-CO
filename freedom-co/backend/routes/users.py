from Flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from models.DataBase import db
from models.User import User

users_bp = Blueprint('User', __name__)

# @users_bp.route('/api/users/<uuid:id>', methods=['GET'])
# def get_user(id):
#     # Querying user from id
#     user = User.query.get_or_404(id)
#     return jsonify(user.to_dict())

@users_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400
    
    new_user = User(
        username=username,
        password=generate_password_hash(password, method='bcrypt'))
    
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username already exists.'}), 400
    
    return jsonify({'message': 'User created successfully.'}), 201