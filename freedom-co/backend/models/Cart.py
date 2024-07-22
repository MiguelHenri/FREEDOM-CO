from .DataBase import db

class Cart(db.Model):
    __tablename__ = 'carts'  # Database (PG) table name
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), db.ForeignKey('users.username'), nullable=False)
    item_id = db.Column(db.String, db.ForeignKey('items.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.CHAR(3), nullable=False)

    def to_dict(self):
        return {
            'username': self.username,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'size': self.size
        }