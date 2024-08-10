from flask import Blueprint, request, jsonify
from models.DataBase import db
from models.Cart import Cart
from models.StoreItem import StoreItem
from models.Purchase import Purchase
from models.Purchase import PurchaseStatus
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
def clear_and_confirm():
    username = get_jwt_identity().get('username')

    try:
        # Retrieving the purchase record for the user
        purchase = Purchase.query.filter_by(username=username, 
                                            status=PurchaseStatus.PENDING).first()
        if not purchase:
            return jsonify({"message": "No pending reservation found for the user."}), 404

        # Confirming purchase
        purchase.status = PurchaseStatus.CONFIRMED

        # Retrieving items from the cart associated with the purchase
        cart_items = Cart.query.filter_by(purchase_id=purchase.id).all()
        if not cart_items:
            return jsonify({"message": "No items found in the cart for this reservation."}), 404

        # Clearing cart
        for item in cart_items:
            db.session.delete(item)

        # All fine
        db.session.commit()
        return jsonify({
            "message": "Reservation confirmed and items removed from cart successfully.",
            "purchase_id": purchase.id
        }), 200

    except Exception as e:
        # Rollback and handle any exception
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@carts_bp.route('/api/carts/checkout', methods=['GET'])
@jwt_required()
def checkout_from_user():
    username = get_jwt_identity().get('username')

    if Purchase.query.filter_by(username=username, status=PurchaseStatus.PENDING).first():
        return jsonify({"message": "A pending reservation already exists."}), 400

    try:
        # Getting cart items given the username
        cart_items = Cart.query.filter_by(username=username).all()
        total_value = 0

        # Creating a new purchase record
        purchase = Purchase(username=username, status=PurchaseStatus.PENDING)
        db.session.add(purchase)

        for item in cart_items:
            # Search item and blocking (avoid race condition)
            store_item = StoreItem.query.filter_by(id=item.item_id).with_for_update().first()
            clean_size = item.size.strip()

            # Checking if item exists and size is valid
            if not (store_item and clean_size in store_item.size_quantity_pairs):
                db.session.rollback()
                return jsonify({"message": "Item not found."}), 404

            # Checking stock availability
            if item.quantity > store_item.size_quantity_pairs.get(clean_size, 0):
                db.session.rollback()
                return jsonify({"message": "Not enough stock available."}), 400

            # Reserving item by updating stock
            store_item.size_quantity_pairs[clean_size] -= item.quantity
            total_value += float(store_item.value.replace('$', '')) * item.quantity

            # Updating cart item with purchase_id
            item.purchase_id = purchase.id
            db.session.add(item)

        # Generate Pix code
        pix = Pix(
            PixConfig.NAME,
            PixConfig.KEY,
            f"{total_value:.2f}",
            PixConfig.CITY,
            PixConfig.TXT_ID
        )
        payload = pix.generatePayload()
        if not payload:
            db.session.rollback()
            return jsonify({"message": "Error generating Pix payload."}), 500

        # All fine
        db.session.commit()
        return jsonify({
            'purchase_id': purchase.id,
            'payload': payload
        }), 200

    except Exception as e:
        # Rollback and handle any exception
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

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