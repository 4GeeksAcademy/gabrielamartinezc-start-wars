from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.models import db, User, People, Planet, Favorite
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
    


    

@api.route('/user', methods=['PUT'])
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


# PEOPLE ROUTES
@api.route('/people', methods=['GET'])
def people():
    people = People.query.all()
    people = list(map(lambda people: people.serialize(), people))
    return jsonify(people), 200

@api.route('/people/<int:id>', methods=['GET'])
def people_by_id(id):
    person = People.query.get(id)

    if not person:
        return jsonify('people not exists', 404)
    
    return jsonify({'person': person.serialize(), 'status':200})

@api.route("/people", methods=['POST'])
def create_people():
    data = request.json

    person = People()

    person.name = data.get('name')
    person.height = data.get('height')
    person.mass = data.get('mass')
    person.hair_color = data.get('hair_color')
    person.skin_color = data.get('skin_color')
    person.eye_color = data.get('eye_color')
    person.birth_year = data.get('birth_year')
    person.gender = data.get('gender')
    person.homeworld = data.get('homeworld')

    db.session.add(person)
    db.session.commit()

    return jsonify('created people', 200)

@api.route('/people/<int:id>', methods=['PUT'])
def update_person(id):
    # Retrieve the JSON data from the request
    data = request.get_json()

    # Find the person by ID
    person = People.query.get(id)
    if not person:
        return jsonify({'message': 'Person not found'}), 404

    # Update the person's attributes
    if 'name' in data:
        person.name = data['name']
    if 'height' in data:
        person.height = data['height']
    if 'mass' in data:
        person.mass = data['mass']
    if 'hair_color' in data:
        person.hair_color = data['hair_color']
    if 'skin_color' in data:
        person.skin_color = data['skin_color']
    if 'eye_color' in data:
        person.eye_color = data['eye_color']
    if 'birth_year' in data:
        person.birth_year = data['birth_year']
    if 'gender' in data:
        person.gender = data['gender']
    if 'homeworld' in data:
        person.homeworld = data['homeworld']

    # Commit the changes to the database
    db.session.commit()

    # Return the updated person
    return jsonify(person.serialize())

@api.route('/people/<int:id>', methods=['DELETE'])
def delete_person(id):

    # Retrieve the JSON data from the request
    data = request.get_json()

    # Find the person by ID
    person = People.query.get(id)
    if not person:
        return jsonify({'message': 'Person not found'}), 404

    db.session.delete(person)
    # Commit the changes to the database
    db.session.commit()

    # Return the updated person
    return jsonify('person deleted')



# PLANET ROUTES
@api.route('/planets', methods=['GET'])
def planets():
    planets = Planet.query.all()
    planets = list(map(lambda planet: planet.serialize(), planets))
    return jsonify(planets), 200

@api.route('/planets/<int:id>', methods=['GET'])
def planet_by_id(id):
    planet = Planet.query.get(id)

    if not planet:
        return jsonify('planet not exists', 404)
    
    return jsonify({'planet': planet.serialize(), 'status':200})

@api.route("/planets", methods=['POST'])
def create_planet():
    data = request.json

    planet = Planet()

    planet.name = data.get('name')
    planet.rotation_period = data.get('rotation_period')
    planet.orbital_period = data.get('orbital_period')
    planet.diameter = data.get('diameter')
    planet.climate = data.get('climate')
    planet.gravity = data.get('gravity')
    planet.terrain = data.get('terrain')
    planet.surface_water = data.get('surface_water')
    planet.population = data.get('population')

    db.session.add(planet)
    db.session.commit()

    return jsonify(f'created planet {planet.name}', 200)

@api.route('/planets/<int:id>', methods=['PUT'])
def update_planet(id):
    # Retrieve the JSON data from the request
    data = request.get_json()

    # Find the planet by ID
    planet = Planet.query.get(id)
    if not planet:
        return jsonify({'message': 'Planet not found'}), 404

    # Update the planet's attributes
    if 'name' in data:
        planet.name = data['name']
    if 'rotation_period' in data:
        planet.rotation_period = data['rotation_period']
    if 'orbital_period' in data:
        planet.orbital_period = data['orbital_period']
    if 'diameter' in data:
        planet.diameter = data['diameter']
    if 'climate' in data:
        planet.climate = data['climate']
    if 'gravity' in data:
        planet.gravity = data['gravity']
    if 'terrain' in data:
        planet.terrain = data['terrain']
    if 'surface_water' in data:
        planet.surface_water = data['surface_water']
    if 'population' in data:
        planet.population = data['population']

    # Commit the changes to the database
    db.session.commit()

    # Return the updated planet
    return jsonify(planet.serialize())

@api.route('/planets/<int:id>', methods=['DELETE'])
def delete_planet(id):
    
        # Retrieve the JSON data from the request
        data = request.get_json()
    
        # Find the planet by ID
        planet = Planet.query.get(id)
        if not planet:
            return jsonify({'message': 'Planet not found'}), 404
    
        db.session.delete(planet)
        # Commit the changes to the database
        db.session.commit()
    
        # Return the updated planet
        return jsonify('planet deleted')


# FAVORITE ROUTES
@api.route('/favorites', methods=['GET'])
def favorites():
    favorites = Favorite.query.all()
    favorites = list(map(lambda favorite: favorite.serialize(), favorites))
    return jsonify(favorites), 200


#favorites by user id
@api.route('/favorites/user/<int:id>', methods=['GET'])
def favorites_by_user(id):
    favorites = Favorite.query.filter_by(user_id=id)
    favorites = list(map(lambda favorite: favorite.serialize(), favorites))
    return jsonify(favorites), 200

@api.route('/favorites', methods=['POST'])
def create_favorite():
    data = request.json

    favorite = Favorite()

    favorite.user_id = data.get('user_id')
    favorite.people_id = data.get('people_id')
    favorite.planet_id = data.get('planet_id')

    db.session.add(favorite)
    db.session.commit()

    return jsonify('created favorite', 200)

@api.route('/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(id):
        
            # Retrieve the JSON data from the request
            data = request.get_json()
        
            # Find the favorite by ID
            favorite = Favorite.query.get(id)
            if not favorite:
                return jsonify({'message': 'Favorite not found'}), 404
        
            db.session.delete(favorite)
            # Commit the changes to the database
            db.session.commit()
        
            # Return the updated favorite
            return jsonify('favorite deleted')