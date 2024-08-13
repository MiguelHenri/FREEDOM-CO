from .DataBase import db
from uuid import uuid4
from enum import Enum as PyEnum
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta, timezone

class PurchaseStatus(PyEnum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    DONE = "DONE"

class Purchase(db.Model):
    __tablename__ = 'purchases' # Database (PG) table name
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    status = db.Column(db.Enum(PurchaseStatus), nullable=False)
    username = db.Column(db.String(50), db.ForeignKey('users.username'), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc) + timedelta(minutes=10))
    value = db.Column(db.String(10))

    carts = relationship("Cart", back_populates="purchase")

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status.value,
            'username': self.username,
            'expires_at': self.expires_at.isoformat(),
            'items': [item.to_dict() for item in self.carts],
            'value': self.value
        }