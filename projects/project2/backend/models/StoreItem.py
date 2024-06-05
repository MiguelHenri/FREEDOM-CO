from .DataBase import db
from uuid import uuid4

class StoreItem(db.Model):
    __tablename__ = 'items'  # Nome da tabela existente no banco de dados
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    image = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    value = db.Column(db.String(50), nullable=False)
    oldValue = db.Column(db.String(50), nullable=True)
    tagColor = db.Column(db.String(50), nullable=True)
    tag = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'title': self.title,
            'description': self.description,
            'value': self.value,
            'oldValue': self.oldValue,
            'tagColor': self.tagColor,
            'tag': self.tag
        }