from .DataBase import db

class User(db.Model):
    __tablename__ = 'users' # Database (PG) table name
    username = db.Column(db.String(50), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin,
        }