import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../styles/itemPreviewComponent.css";
import HeartIcon from "../heartIcon.jsx";
import { useNavigate } from "react-router-dom";

const VehicleItem = ({ title, model, passengers, vehicleClass, image }) => {
  const navigate = useNavigate(); 

  
  const handleClick = () => {
    navigate(`/vehicles/${title}`); 
  };

  return (
    <Card
      className="card-custom-border"
      style={{ width: "18rem", maxWidth: "18rem", maxHeight: "480px" }}
    >
      <Card.Img
        variant="top"
        style={{ maxWidth: "286px", maxHeight: "286px" }}
        src={image}
      />
      <Card.Body>
        <Card.Title
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Text
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Model: {model} <br />
          Passengers: {passengers} <br />
          Class: {vehicleClass}
        </Card.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleClick} variant="secondary">
            Saber más!
          </Button>
          <HeartIcon itemType={"vehicles"} name={title} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleItem;
