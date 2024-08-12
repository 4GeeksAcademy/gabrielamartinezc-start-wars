import React, { useContext } from "react";
import PeopleItem from "../items/peopleItem.jsx";
import { Context } from "../../store/appContext";

const PeoplePreview = () => {
  const { store, actions } = useContext(Context);

  const resource = store.people; // Array of people objects

  

  return (
    <>
      {
        <>
          <h2 className="text-center mt-5" id="characters">
            Characters
          </h2>
          <div className="row flex-nowrap overflow-auto">
            {resource
              ? resource.map((person, index) => {
                  return (
                    <div className="col-auto me-3" key={index}>
                      <PeopleItem
                        title={person.name}
                        hairColor={person.hair_color}
                        eyesColor={person.eye_color}
                        gender={person.gender}
                        imgSource={person.imgSource}
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

export default PeoplePreview;
