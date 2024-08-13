from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.Purchase import Purchase, PurchaseStatus

purchases_bp = Blueprint('Purchase', __name__)

@purchases_bp.route('/api/purchases', methods=['GET'])
@jwt_required()
def get_old_purchases():
    username = get_jwt_identity().get('username')

    # Querying purchases for the username
    purchases = Purchase.query.filter_by(username=username, 
                                        status=PurchaseStatus.CONFIRMED).all()
    
    if not purchases:
        return jsonify([]), 200
    
    return jsonify([p.to_dict() for p in purchases]), 200
