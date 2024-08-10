from flask import Blueprint, request, jsonify
from models.DataBase import db
from models.Cart import Cart
from models.StoreItem import StoreItem
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import PixConfig
from utils import Pix

carts_bp = Blueprint('Cart', __name__)

# Getting an user cart using JWT 
@carts_bp.route('/api/carts', methods=['GET'])
@jwt_required()
def get_cart_from_user():
    username = get_jwt_identity().get('username')

    # Getting cart given an username
    cart = Cart.query.filter_by(username=username).all()
    if not cart:
        return jsonify([]), 200

    cart = [c.to_dict() for c in cart]
    return jsonify(cart), 200

@carts_bp.route('/api/carts/clear', methods=['DELETE'])
@jwt_required()
def clear_and_proccess():
    username = get_jwt_identity().get('username')

    # Getting cart given an username and deleting
    cart = Cart.query.filter_by(username=username).all()
    for item in cart:
        # Searching item and blocking (avoiding race condition)
        store_item = StoreItem.query.filter_by(id=item.item_id).with_for_update().first()
        clean_size = item.size.strip()

        # todo check reservation

        # Updating item quantities
        if store_item and (clean_size in store_item.size_quantity_pairs):
            store_item.size_quantity_pairs[clean_size] -= item.quantity
        else:
            return jsonify({"message": "Item not found."}), 404

        # Deleting item from cart
        db.session.delete(item)

    # Confirming
    db.session.commit()
    return jsonify({"message": "Cart cleared successfully."}), 200

@carts_bp.route('/api/carts/checkout', methods=['GET'])
@jwt_required()
def checkout_from_user():
    # todo add reservation
    username = get_jwt_identity().get('username')

    # Getting cart items given the username
    cart = Cart.query.filter_by(username=username).all()
    totalValue = 0
    for c in cart:
        # # Search item and blocking (avoid race condition)
        # store_item = StoreItem.query.filter_by(id=item.item_id).with_for_update().first()
        # clean_size = item.size.strip()
        # # Checking item
        # if not (store_item and clean_size in store_item.size_quantity_pairs):
        #     return jsonify({"message": "Item not found."}), 404
        # # Tries to make reservation
        # if store_item.reserve_item(clean_size, item.quantity):
        #     totalValue += float(store_item.value.replace('$', '')) * item.quantity
        # else:
        #     return jsonify({"message": "Not enough stock available."}), 400
            
        totalValue += float(c.item.value.replace('$', '')) * c.quantity

    # Generating Pix Code
    pix = Pix(
        PixConfig.NAME,
        PixConfig.KEY,
        f"{totalValue:.2f}",
        PixConfig.CITY,
        PixConfig.TXT_ID
    )
    payload = pix.generatePayload()
    if not payload:
        return jsonify({"message": "Error generating pix payload."}), 500

    response = { 'payload': payload }
    
    return jsonify(response), 200

@carts_bp.route('/api/carts', methods=['POST'])
@jwt_required()
def add_item_to_cart():
    username = get_jwt_identity().get('username')
    
    data = request.json
    item_id = data.get('id')
    quantity = data.get('quantity')
    size = data.get('size')

    if not item_id or not quantity or not size:
        return jsonify({"message": "Missing required fields."}), 400
    
    size = size.strip()
    # Ensuring the item has the quantity necessary
    store_item = StoreItem.query.filter_by(id=item_id).first()
    if quantity > store_item.size_quantity_pairs[size]:
        return jsonify({"message": f"Not enough stock for item '{store_item.title}' of size '{size}'."}), 400
    
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

@carts_bp.route('/api/carts/<uuid:cart_id>', methods=['PUT'])
@jwt_required()
def edit_item_from_cart(cart_id):
    username = get_jwt_identity().get('username')
    
    data = request.json
    quantity = data.get('quantity')
    size = data.get('size')

    # Ensuring the cart exists
    cart_item = Cart.query.filter_by(id=cart_id, username=username).first()
    if not cart_item:
        return jsonify({"message": "Cart item not found."}), 404
    
    # Ensuring quantity and size are valid
    if not quantity or not size:
        return jsonify({"message": "Missing required fields."}), 400
    
    size = size.strip()
    # Ensuring the item has the quantity necessary
    store_item = StoreItem.query.filter_by(id=cart_item.item_id).first()
    if quantity > store_item.size_quantity_pairs[size]:
        return jsonify({"message": f"Not enough stock for item '{store_item.title}' of size '{size}'."}), 400

    if quantity <= 0: # Item quantity below or equal 0, we remove from Cart
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({"message": "Item deleted from cart successfully."}), 200

    cart_item.quantity = quantity
    cart_item.size = size
    db.session.commit()
    return jsonify({
        "message": "Cart item updated successfully.", 
        "cart_item": cart_item.to_dict()
    }), 200

@carts_bp.route('/api/carts/<uuid:cart_id>', methods=['DELETE'])
@jwt_required()
def delete_item_from_cart(cart_id):
    username = get_jwt_identity().get('username')

    cart_item = Cart.query.filter_by(id=cart_id, username=username).first()
    
    if not cart_item:
        return jsonify({"message": "Cart item not found."}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({"message": "Item deleted from cart successfully."}), 200