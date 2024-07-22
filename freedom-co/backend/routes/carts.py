from flask import Blueprint, request, jsonify, session
from models.DataBase import db
from models.Cart import Cart

carts_bp = Blueprint('Cart', __name__)

@carts_bp.route('/api/carts/<string:username>', methods=['GET'])
def get_cart_from_username(username):
    # Checking who is the user
    if 'username' not in session:
        return jsonify({"message": "Unauthorized. Please log in."}), 401

    user_logged = session[username]
    if username != user_logged:
        return jsonify({"message": "Forbidden. You can only access your own cart."}), 403

    # Getting cart given an username
    cart = Cart.query.filter_by(username=username).all()
    if not cart:
        return jsonify({"message": "No cart found."}), 404

    cart = [c.to_dict() for c in cart]
    return jsonify(cart)

@carts_bp.route('/api/carts/clear/<string:username>', methods=['DELETE'])
def clear_cart_from_username(username):
    # Checking who is the user
    if 'username' not in session:
        return jsonify({"message": "Unauthorized. Please log in."}), 401

    user_logged = session[username]
    if username != user_logged:
        return jsonify({"message": "Forbidden. You can only access your own cart."}), 403

    # Getting cart given an username and deleting
    cart = Cart.query.filter_by(username=username).all()
    for item in cart:
        db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Cart cleared successfully."}), 200

@carts_bp.route('api/carts/<string:username>', methods=['POST'])
def add_item_to_cart(username):
    # Checking who is the user
    if 'username' not in session:
        return jsonify({"message": "Unauthorized. Please log in."}), 401

    user_logged = session[username]
    if username != user_logged:
        return jsonify({"message": "Forbidden. You can only access your own cart."}), 403
    
    data = request.json
    item_id = data.get('item_id')
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
    return jsonify({"message": "Item added to cart successfully.", 
                    "cart_item": new_cart_item.to_dict()}), 201

@carts_bp.route('api/carts/<string:username>', methods=['PUT'])
def edit_item_from_cart(username):
    # Checking who is the user
    if 'username' not in session:
        return jsonify({"message": "Unauthorized. Please log in."}), 401

    user_logged = session[username]
    if username != user_logged:
        return jsonify({"message": "Forbidden. You can only access your own cart."}), 403
    
    data = request.json
    cart_id = data.get('id')
    quantity = data.get('quantity')
    size = data.get('size')

    cart_item = Cart.query.filter_by(id=cart_id, username=username).first()
    if not cart_item:
        return jsonify({"message": "Cart item not found."}), 404
    
    if quantity:
        cart_item.quantity = quantity
    if size:
        cart_item.size = size

    db.session.commit()
    return jsonify({"message": "Cart item updated successfully.", 
                    "cart_item": cart_item.to_dict()}), 200

@carts_bp.route('api/carts/<string:username>', methods=['DELETE'])
def delete_item_from_cart(username):
    # Checking who is the user
    if 'username' not in session:
        return jsonify({"message": "Unauthorized. Please log in."}), 401

    user_logged = session[username]
    if username != user_logged:
        return jsonify({"message": "Forbidden. You can only access your own cart."}), 403

    data = request.json
    cart_id = data.get('id')

    cart_item = Cart.query.filter_by(id=cart_id, username=username).first()
    
    if not cart_item:
        return jsonify({"message": "Cart item not found."}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({"message": "Item deleted from cart successfully."}), 200