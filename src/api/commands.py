import click
from flask import json
from api.models import db, User, People, Planet
import requests

def setup_commands(app):

    def create_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            print(f"User: {user.email} added.")
        
        db.session.commit()
        print("All test users created")

    @app.cli.command("insert-test-users")
    @click.argument("count")
    def insert_test_users_command(count):
        create_test_users(count)

    def insert_people():
        response = requests.get("https://swapi.dev/api/people")
        people_data = json.loads(response.content.decode('utf-8'))["results"]

        for person in people_data:
            p = People()
            p.name = person["name"]
            p.gender = person["gender"]
            p.height = person.get("height", "unknown")
            p.mass = person.get("mass", "unknown")
            p.hair_color = person.get("hair_color", "unknown")
            p.skin_color = person.get("skin_color", "unknown")
            p.eye_color = person.get("eye_color", "unknown")
            p.birth_year = person.get("birth_year", "unknown")

            planet_response = requests.get(person.get("homeworld"))
            p.homeworld = json.loads(planet_response.content.decode('utf-8'))["name"]

            db.session.add(p)
            print(f"Added Person: {p.name}")
        
        db.session.commit()
        print("All people created")

    def insert_planets():
        response = requests.get("https://swapi.dev/api/planets")
        planets_data = json.loads(response.content.decode('utf-8'))["results"]

        for planet in planets_data:
            p = Planet()
            p.name = planet["name"]
            p.rotation_period = planet.get("rotation_period", "unknown")
            p.orbital_period = planet.get("orbital_period", "unknown")
            p.diameter = planet.get("diameter", "unknown")
            p.climate = planet.get("climate", "unknown")
            p.gravity = planet.get("gravity", "unknown")
            p.terrain = planet.get("terrain", "unknown")
            p.surface_water = planet.get("surface_water", "unknown")
            p.population = planet.get("population", "unknown")

            db.session.add(p)
            print(f"Added Planet: {p.name}")

        db.session.commit()
        print("All planets created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        create_test_users(20)  # Directly call the function with the desired count
        insert_people()
        insert_planets()

        print("All test data created")
