from .DataBase import db
from uuid import uuid4
from enum import Enum as PyEnum
from sqlalchemy.orm import relationship

class PurchaseStatus(PyEnum):
    PENDING = "Pending"
    CONFIRMED = "Confirmed"
    DONE = "Done"

class Purchase(db.Model):
    # todo add expiration logic
    __tablename__ = 'purchases' # Database (PG) table name
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    status = db.Column(db.Enum(PurchaseStatus), nullable=False)
    username = db.Column(db.String, db.ForeignKey('users.username'), nullable=False)

    carts = relationship("Cart", back_populates="purchase")

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status.value,
            'username': self.username,
            'items': [item.to_dict() for item in self.carts]
        }