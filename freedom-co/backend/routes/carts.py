from flask import Blueprint, request, jsonify
from models.DataBase import db
from models.Cart import Cart
from flask_jwt_extended import jwt_required, get_jwt_identity
from pixqrcodegen import Payload
from config import PixConfig

carts_bp = Blueprint('Cart', __name__)

# Getting an user cart using JWT 
@carts_bp.route('/api/carts', methods=['GET'])
@jwt_required()
def get_cart_from_user():
    username = get_jwt_identity().get('username')
    print(f'Token valid, username: {username}')

    # Getting cart given an username
    cart = Cart.query.filter_by(username=username).all()
    if not cart:
        return jsonify([]), 200

    cart = [c.to_dict() for c in cart]
    return jsonify(cart), 200

@carts_bp.route('/api/carts/clear', methods=['DELETE'])
@jwt_required()
def clear_cart_from_user():
    username = get_jwt_identity().get('username')
    print(f'Token valid, username: {username}')

    # Getting cart given an username and deleting
    cart = Cart.query.filter_by(username=username).all()
    for item in cart:
        # todo update item quantities
        db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Cart cleared successfully."}), 200

@carts_bp.route('/api/carts/checkout', methods=['GET'])
@jwt_required()
def checkout_from_user():
    username = get_jwt_identity().get('username')
    print(f'Token valid, username: {username}')

    # todo - calculate value

    # Generating Pix QR Code
    payload = Payload(
        PixConfig.NAME,
        PixConfig.KEY,
        '1.00', #value
        PixConfig.CITY,
        PixConfig.TXT_ID
    )
    response = { 'payload': payload.gerarPayload() }
    
    return jsonify(response)

@carts_bp.route('/api/carts', methods=['POST'])
@jwt_required()
def add_item_to_cart():
    # todo - guarantee item has the quantity necessary
    username = get_jwt_identity().get('username')
    print(f'Token valid, username: {username}')
    
    data = request.json
    item_id = data.get('id')
    quantity = data.get('quantity')
    size = data.get('size')

    if not item_id or not quantity or not size:
        return jsonify({"message": "Missing required fields."}), 400
    
    new_cart_item = Cart(
        username = username,
        item_id = item_id,
        quantity = quantity,
        size = size
    )
    db.session.add(new_cart_item)
    db.session.commit()

    return jsonify({
        "message": "Item added to cart successfully.", 
        "cart_item": new_cart_item.to_dict()
    }), 201

@carts_bp.route('/api/carts/<int:cart_id>', methods=['PUT'])
@jwt_required()
def edit_item_from_cart(cart_id):
    username = get_jwt_identity().get('username')
    
    data = request.json
    quantity = data.get('quantity')
    size = data.get('size')

    cart_item = Cart.query.filter_by(id=cart_id, username=username).first()
    if not cart_item:
        return jsonify({"message": "Cart item not found."}), 404
    
    if quantity:
        cart_item.quantity = quantity
    if size:
        cart_item.size = size

    if quantity <= 0: # Item quantity below or equal 0, we remove from Cart
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({"message": "Item deleted from cart successfully."}), 200

    db.session.commit()
    return jsonify({
        "message": "Cart item updated successfully.", 
        "cart_item": cart_item.to_dict()
    }), 200

@carts_bp.route('/api/carts/<int:cart_id>', methods=['DELETE'])
@jwt_required()
def delete_item_from_cart(cart_id):
    username = get_jwt_identity().get('username')
    print(f'Token valid, username: {username}')

    cart_item = Cart.query.filter_by(id=cart_id, username=username).first()
    
    if not cart_item:
        return jsonify({"message": "Cart item not found."}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({"message": "Item deleted from cart successfully."}), 200