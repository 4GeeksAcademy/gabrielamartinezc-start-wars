import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import startWarsLogo from "../../img/starwars-logo.png";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {
  const { store } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link className="navbar-brand" to="/">
            <img
              src={startWarsLogo}
              alt="star wars logo"
              style={{ maxHeight: "50px" }}
            />
          </Link>
          {/* <div className="d-flex justify-content-center flex-grow-1">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/#characters">
                  Characters
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#planets">
                  Planets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#vehicles">
                  Vehicles
                </a>
              </li>
            </ul>
          </div> */}
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              id="favoritesDropdown"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Favorites{" "}
              <span className="badge badge-light">
                {store.favorites.length}
              </span>
            </button>
            <div
              className={`dropdown-menu dropdown-menu-right ${
                isDropdownOpen ? "show" : ""
              }`}
              aria-labelledby="favoritesDropdown"
            >
              {store.favorites.length > 0 ? (
                store.favorites.map((item, index) => (
                  <Link
                    key={index}
                    className="dropdown-item"
                    to={`/${item.itemType}/${item.name}`}
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <span className="dropdown-item">No favorites added</span>
              )}
            </div>
          </div>

          <Link to="/contact/list" className="btn btn-primary">
            {" "}
            Contacts{" "}
          </Link>

          {isLogged ? (
            <button className="btn btn-danger" onClick={logOut}>
              Log out
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
