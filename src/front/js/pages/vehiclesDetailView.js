import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VehiclesDetailView = () => {
  const { store } = useContext(Context);
  const { vehicleName } = useParams();

  const [item, setItem] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pilot, setPilot] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Find the item by name in the store
    const vehicle = store.vehicles.find(
      (vehicle) => vehicle.name === vehicleName
    );
    if (isMounted) setItem(vehicle);

    // Fetch movie titles for each film URL
    if (vehicle?.films?.length > 0) {
      const fetchMovies = async () => {
        const movieTitles = [];
        for (let i = 0; i < vehicle.films.length; i++) {
          const response = await fetch(vehicle.films[i]);
          const data = await response.json();
          movieTitles.push(data.title);
        }
        if (isMounted) setMovies(movieTitles);
      };
      fetchMovies();
    }

    // Fetch pilot names for each pilot URL in the people endpoint
    if (vehicle?.pilots?.length > 0) {
      const fetchPilots = async () => {
        const pilotsNames = [];
        for (let i = 0; i < vehicle.pilots.length; i++) {
          const response = await fetch(vehicle.pilots[i]);
          const data = await response.json();
          pilotsNames.push(data.name); // Assuming the name is inside result.properties.name
        }
        if (isMounted) setPilot(pilotsNames); // Only update state if still mounted
      };
      fetchPilots();
    }

    return () => {
      isMounted = false;
    };
  }, [vehicleName, store.vehicles]);

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
              <p>Model: {item.model}</p>
              <p>Passengers: {item.passengers}</p>
              <p>Class: {item.vehicle_class}</p>
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
            <h4>Manufacturer</h4>
            <ul className="list-unstyled">
              <li>{item.manufacturer}</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Cargo Capacity</h4>
            <ul className="list-unstyled">
              <li>{item.cargo_capacity}</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Lenght</h4>
            <ul className="list-unstyled">
              <li>{item.length}</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Max Atmosphere Speed</h4>
            <ul className="list-unstyled">
              <li>{item.max_atmosphering_speed}</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Cost in Credits</h4>
            <ul className="list-unstyled">
              <li>{item.cost_in_credits}</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg">
            <h4>Pilots</h4>
            <ul className="list-unstyled">
              {pilot && pilot.length > 0 ? (
                pilot.map((pilot, index) => <li key={index}>{pilot}</li>)
              ) : (
                <li>No pilots found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehiclesDetailView;
