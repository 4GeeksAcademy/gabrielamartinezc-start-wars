import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import PeoplePreview from "../component/itemPreviews/peoplePreview";
import PlanetPreview from "../component/itemPreviews/planetPreview";
import VehiclePreview from "../component/itemPreviews/vehiclePreview";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (!store.people.length) {
      actions.fetchPeople();
    }
    if (!store.planets.length) {
      actions.fetchPlanets();
    }
    if (!store.vehicles.length) {
      actions.fetchVehicles();
    }
  }, [store.people, store.planets, store.vehicles, actions]);

  return (
    <div className="container">
      <PeoplePreview />
      <PlanetPreview />
      <VehiclePreview />
    </div>
  );
};
