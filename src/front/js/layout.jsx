import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop.jsx";
import { BackendURL } from "./component/backendURL.jsx";
import { Home } from "./pages/home.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

import "../styles/index.css";
import PeopleDetailView from "./pages/peopleDetailView.jsx";
import PlanetDetailView from "./pages/planetsDetailView.jsx";
import VehicleDetailView from "./pages/vehiclesDetailView.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<PeopleDetailView />} path="/people/:peopleName" />
            <Route element={<PlanetDetailView />} path="/planets/:planetName" />
            <Route element={<VehicleDetailView />} path="/vehicles/:vehicleName" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
