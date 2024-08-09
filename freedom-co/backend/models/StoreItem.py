from .DataBase import db
from uuid import uuid4
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableDict

class StoreItem(db.Model):
    __tablename__ = 'items'  # Database (PG) table name
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    image = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    value = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    oldvalue = db.Column(db.String(100))
    tagcolor = db.Column(db.String(50))
    tag = db.Column(db.String(50))
    size_quantity_pairs = db.Column(MutableDict.as_mutable(JSONB), default=dict)

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'title': self.title,
            'description': self.description,
            'value': self.value,
            'type': self.type,
            'oldValue': self.oldvalue,
            'tagColor': self.tagcolor,
            'tag': self.tag,
            'size_quantity_pairs': self.size_quantity_pairs
        }
