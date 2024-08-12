import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {
      // Call the new action to fetch people data
      state.actions.fetchPeople();
    }, []);

    useEffect(() => {
      // Call the new action to fetch people data
      state.actions.fetchPlanets();
    }, []);

    useEffect(() => {
      // Call the new action to fetch people data
      state.actions.fetchVehicles();
    }, []);

    // get agenda
    useEffect(() => {
      state.actions.getAgenda();
    }, []);

    // create agenda only once, when the component is mounted
    // useEffect(() => {
    //   state.actions.createAgenda();
    // }, []);

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
