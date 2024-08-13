from .DataBase import db

class User(db.Model):
    __tablename__ = 'users' # Database (PG) table name
    username = db.Column(db.String(50), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # Address attributes
    address_line_1 = db.Column(db.String(150))
    address_line_2 = db.Column(db.String(150))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100))
    zip_code = db.Column(db.String(20))
    
    def to_dict(self):
        return {
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin,
            'address_line_1': self.address_line_1,
            'address_line_2': self.address_line_2,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zip_code': self.zip_code,
        }