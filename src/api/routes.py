from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Secret key for JWT encoding/decoding
SECRET_KEY = 'your_secret_key_here'

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already in use"}), 400

    # Use a supported hash method
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    
    new_user = User(email=email, password=hashed_password, is_active=True)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password, password) and user.is_active:
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY, algorithm='HS256')
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials or inactive account"}), 401

@api.route('/private', methods=['GET'])
def private():
    token = request.headers.get('Authorization')
    
    if not token:
        return jsonify({"error": "Token is missing"}), 401
    
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token.get('user_id')
        
        user = User.query.get(user_id)
        
        if user:
            return jsonify({"message": f"Hello {user.email}!"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
        
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401


@api.route('/users', methods=['GET'])
def users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200


@api.route('/user/<int:id>', methods=['GET'])
def user(id):
    user = User.query.get(id)
    
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"error": "User not found"}), 404
    

@api.route('/user/', methods=['PUT'])
@jwt_required()
def update_user():
    current_user = get_jwt_identity()  # Get the current user's identity from the JWT
    
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find the user by their identity (email or id stored in the token)
    user = User.query.filter_by(email=current_user).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    if email:
        user.email = email
    if password:
        user.password = generate_password_hash(password, method='pbkdf2:sha256')

    db.session.commit()
    
    return jsonify({"message": "User updated successfully"}), 200