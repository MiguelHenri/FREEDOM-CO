from .DataBase import db
from uuid import uuid4
from sqlalchemy.orm import relationship
from .Purchase import Purchase

class Cart(db.Model):
    __tablename__ = 'carts'  # Database (PG) table name
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    username = db.Column(db.String(50), db.ForeignKey('users.username'), nullable=False)
    item_id = db.Column(db.String, db.ForeignKey('items.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.CHAR(3), nullable=False)
    purchase_id = db.Column(db.String, db.ForeignKey('purchases.id'), nullable=True)

    item = relationship('StoreItem', back_populates='carts')
    purchase = relationship('Purchase', back_populates='carts')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.item.image,
            'title': self.item.title,
            'value': self.item.value,
            'quantity': self.quantity,
            'size': self.size,
            'item_id': self.item_id,
            'purchase_id': self.purchase_id
        }