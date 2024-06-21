from flask import Blueprint, request, jsonify
from models.DataBase import db
from models.StoreItem import StoreItem

item_bp = Blueprint('StoreItem', __name__)

@item_bp.route('/api/items', methods=['GET'])
def get_items():
    # Querying all itens
    items = StoreItem.query.all()

    if not items:
        return jsonify({'message': 'No items found'}), 404

    return jsonify([item.to_dict() for item in items])

@item_bp.route('/api/items/<uuid:item_id>', methods=['GET'])
def get_item(item_id):

    # Querying item from id
    item = StoreItem.query.get_or_404(item_id)
    return jsonify(item.to_dict())

@item_bp.route('/api/items', methods=['POST'])
def create_item():
    data = request.json
    
    # Validating required fields
    required_fields = ['image', 'title', 'description', 'value', 'type']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'Field {field} is required.'}), 400
    
    new_item = StoreItem(
        image=data['image'],
        title=data['title'],
        description=data['description'],
        value=data['value'],
        type=data['type'],
        oldvalue=data.get('oldvalue', None),
        tagcolor=data.get('tagcolor', None),
        tag=data.get('tag', None),
        size_quantity_pairs=data.get('size_quantity_pairs', {})
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201


@item_bp.route('/api/items/<uuid:item_id>', methods=['PUT'])
def update_item(item_id):
    # Querying item from id
    item = StoreItem.query.get_or_404(item_id)
    data = request.json

    # Updating values
    if 'image' in data:
        item.image = data['image']
    if 'title' in data:
        item.title = data['title']
    if 'description' in data:
        item.description = data['description']
    if 'value' in data:
        item.value = data['value']
    if 'type' in data:
        item.type = data['type']
    if 'oldvalue' in data:
        item.oldvalue = data['oldvalue']
    if 'tagcolor' in data:
        item.tagcolor = data['tagcolor']
    if 'tag' in data:
        item.tag = data['tag']
    if 'size_quantity_pairs' in data:
        item.size_quantity_pairs = data['size_quantity_pairs']

    db.session.commit()
    return jsonify(item.to_dict()), 200

@item_bp.route('/api/items/<uuid:item_id>', methods=['DELETE'])
def delete_item(item_id):
    # Querying item from id
    item = StoreItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return '', 204