from Flask import Blueprint, request, jsonify
from models.DataBase import db
from models.User import User

users_bp = Blueprint('User', __name__)

@users_bp.route('/api/users/<uuid:id>', methods=['GET'])
def get_user(id):
    # Querying user from id
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())