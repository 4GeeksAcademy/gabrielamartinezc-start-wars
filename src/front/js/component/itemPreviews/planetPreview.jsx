import React, { useContext } from "react";
import PlanetItem from "../items/planetItem.jsx";
import "../../../styles/itemPreviewComponent.css";
import { Context } from "../../store/appContext";

const PlanetPreview = () => {
  const { store, actions } = useContext(Context);

  const resource = store.planets;

  return (
    <>
      {
        <>
          <h2 className="text-center mt-5" id="planets">
            Planets
          </h2>
          <div className="row flex-nowrap overflow-auto">
            {resource
              ? resource.map((planet, index) => {
                  return (
                    <div className="col-auto me-3" key={index}>
                      <PlanetItem
                        title={planet.name}
                        climate={planet.climate}
                        population={planet.population}
                        terrain={planet.terrain}
                        image={planet.imgSource}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </>
      }
    </>
  );
};

export default PlanetPreview;
