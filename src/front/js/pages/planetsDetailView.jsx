import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanetsDetailView = () => {
  const { store } = useContext(Context);
  const { planetName } = useParams();
  const [movies, setMovies] = useState(null);
  const [item, setItem] = useState(null);
  const [residents, setResidents] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Find the item by name in the store
    const planet = store.planets.find((planet) => planet.name === planetName);
    if (isMounted) setItem(planet);

    // Fetch movie titles for each film URL
    if (planet?.films?.length > 0) {
      const fetchMovies = async () => {
        const movieTitles = [];
        for (let i = 0; i < planet.films.length; i++) {
          const response = await fetch(planet.films[i]);
          const data = await response.json();
          movieTitles.push(data.title);
        }
        if (isMounted) setMovies(movieTitles);
      };
      fetchMovies();
    }

    // Fetch residents names for each resident URL
    if (planet?.residents?.length > 0) {
      const fetchResidents = async () => {
        const residentsNames = [];
        for (let i = 0; i < planet.residents.length; i++) {
          const response = await fetch(planet.residents[i]);
          const data = await response.json();
          residentsNames.push(data.name);
        }
        if (isMounted) setResidents(residentsNames);
      };
      fetchResidents();
    }

    return () => {
      isMounted = false;
    };
  }, [planetName, store.planets]);

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
              src={item.imgSource || "https://via.placeholder.com/800x600"} // Replace with your image URL
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
              <p>Climate: {item.climate}</p>
              <p>Population: {item.population}</p>
              <p>Terrain: {item.terrain}</p>
            </div>
          </div>
        </div>

        {/* Row with 7 Columns */}
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
            <h4>Day Duration (Earth Days)</h4>
            <ul className="list-unstyled">
              <li>{`${item.rotation_period} days`}</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg">
            <h4>Year Duration (Earth Days)</h4>
            <ul className="list-unstyled">
              <li>{`${item.orbital_period} days`}</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg">
            <h4>Diameter</h4>
            <ul className="list-unstyled">
              <li>{`${item.diameter} km`}</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg">
            <h4>Gravity</h4>
            <ul className="list-unstyled">
              <li>{item.gravity}</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg">
            <h4>Surface Water</h4>
            <ul className="list-unstyled">
              <li>{item.surface_water}</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg">
            <h4>Residents</h4>
            <ul className="list-unstyled">
              {residents && residents.length > 0 ? (
                residents.map((resident, index) => (
                  <li key={index}>{resident}</li>
                ))
              ) : (
                <li>No residents found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetsDetailView;
