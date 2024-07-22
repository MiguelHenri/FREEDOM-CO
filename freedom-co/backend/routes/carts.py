from flask import Blueprint, request, jsonify, session
from models.DataBase import db
from models.Cart import Cart

carts_bp = Blueprint('Cart', __name__)

@carts_bp.route('/api/carts/<string:username>', methods=['GET'])
def get_cart_from_username(username):
    # todo check if user is logged in

    # Getting cart given an username
    cart = Cart.query.filter_by(username=username).all()
    if not cart:
        return jsonify({"message": "No cart found."}), 404

    cart = [c.to_dict() for c in cart]
    return jsonify(cart)

# todo clear cart

# todo add item to cart