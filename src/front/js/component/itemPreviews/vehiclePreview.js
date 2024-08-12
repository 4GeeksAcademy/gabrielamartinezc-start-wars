import React, { useContext } from "react";
import VehicleItem from "../items/vehicleItem";
import { Context } from "../../store/appContext";

const VehiclePreview = () => {
  const { store, actions } = useContext(Context);

  const resource = store.vehicles;

  return (
    <>
      {
        <>
          <h2 className="text-center mt-5" id="vehicles">
            Vehicles
          </h2>
          <div className="row flex-nowrap overflow-auto">
            {resource
              ? resource.map((vehicle, index) => {
                  return (
                    <div className="col-auto me-3" key={index}>
                      <VehicleItem
                        title={vehicle.name}
                        model={vehicle.model}
                        passengers={vehicle.passengers}
                        vehicleClass={vehicle.vehicle_class}
                        image={vehicle.imgSource}
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

export default VehiclePreview;
