from flask import Flask, request, jsonify
from models.db import db
from models.item import Item

# Initializing app and db with configs
app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)

@app.route('/api/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.json
    new_item = Item(
        image=data['image'],
        title=data['title'],
        description=data['description'],
        value=data['value'],
        oldValue=data.get('oldValue', None),
        tagColor=data.get('tagColor', None),
        tag=data.get('tag', None)
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)