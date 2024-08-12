import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PeopleDetailView = () => {
  const { store } = useContext(Context);
  const { peopleName } = useParams(); // Luke Skywalker

  const [item, setItem] = useState(null);
  const [movies, setMovies] = useState(null);
  const [species, setSpecies] = useState(null);
  const [home, setHome] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [starships, setStarships] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Find the item by name in the store
    const person = store.people.find((person) => person.name === peopleName);
    if (isMounted) setItem(person);

    // Fetch movie titles for each film URL
    if (person?.films?.length > 0) {
      const fetchMovies = async () => {
        const movieTitles = [];
        for (let i = 0; i < person.films.length; i++) {
          const response = await fetch(person.films[i]);
          const data = await response.json();
          movieTitles.push(data.title);
        }
        if (isMounted) setMovies(movieTitles);
      };
      fetchMovies();
    }

    // Fetch species name from the species URL
    if (person?.species?.length > 0) {
      const fetchSpecies = async () => {
        const speciesNames = [];
        for (let i = 0; i < person.species.length; i++) {
          const response = await fetch(person.species[i]);
          console.log("Response", response);
          const data = await response.json();
          speciesNames.push(data.name);
        }
        if (isMounted) setSpecies(speciesNames);
      };
      fetchSpecies();
    }

    // Fetch homeworld name for the homeworld URL
    if (person?.homeworld) {
      const fetchHome = async () => {
        const response = await fetch(person.homeworld);
        const data = await response.json();
        if (isMounted) setHome(data.name);
      };
      fetchHome();
    }

    // Fetch vehicle names for each vehicle URL
    if (person?.vehicles?.length > 0) {
      const fetchVehicles = async () => {
        const vehicleNames = [];
        for (let i = 0; i < person.vehicles.length; i++) {
          const response = await fetch(person.vehicles[i]); // https://swapi.dev/api/vehicles/14/
          const data = await response.json();
          vehicleNames.push(data.name); // Snowspeeder
        }
        if (isMounted) setVehicles(vehicleNames);
      };
      fetchVehicles();
    }

    // Fetch starship names for each starship URL
    if (person?.starships?.length > 0) {
      const fetchStarships = async () => {
        const starshipNames = [];
        for (let i = 0; i < person.starships.length; i++) {
          const response = await fetch(person.starships[i]);
          const data = await response.json();
          starshipNames.push(data.name);
        }
        if (isMounted) setStarships(starshipNames);
      };
      fetchStarships();
    }

    return () => {
      isMounted = false;
    };
  }, [peopleName, store.people]);

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row mb-4">
          {/* Image Column */}
          <div className="col-md-7 d-flex justify-content-center align-items-center">
            <img
              src={item.imgSource || "https://via.placeholder.com/800x600"}
              alt={item.name}
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          {/* Description Column */}
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <div
              className="p-4 bg-black text-center"
              style={{ color: "yellow" }}
            >
              <h2>{item.name}</h2>
              <p>Hair color: {item.hair_color}</p>
              <p>Eyes Color: {item.eye_color}</p>
              <p>Gender: {item.gender}</p>
            </div>
          </div>
        </div>

       
        <div className="row text-center" style={{ color: "yellow" }}>
          <div className="col-12 col-md-6 col-lg">
            <h4>Appearances</h4>
            <ul className="list-unstyled">
              {movies && movies.length > 0 ? (
                movies.map((movie, index) => <li key={index}>{movie}</li>)
              ) : (
                <li>No appearances found.</li>
              )}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Height</h4>
            <ul className="list-unstyled">
              <li>{item.height || "N/A"} cm</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Weight</h4>
            <ul className="list-unstyled">
              <li>{item.mass || "N/A"} kg</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Species</h4>
            <ul className="list-unstyled">
              {species && species.length > 0 ? (
                species.map((specie, index) => <li key={index}>{specie}</li>)
              ) : (
                <li>Human</li>
              )}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Vehicles</h4>
            <ul className="list-unstyled">
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => <li key={index}>{vehicle}</li>)
              ) : (
                <li>No vehicles found.</li>
              )}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Starships</h4>
            <ul className="list-unstyled">
              {starships && starships.length > 0 ? (
                starships.map((starship, index) => (
                  <li key={index}>{starship}</li>
                ))
              ) : (
                <li>No starships found.</li>
              )}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Location</h4>
            <ul className="list-unstyled">
              <li>{home || "N/A"}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleDetailView;
