import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../styles/itemPreviewComponent.css";
import HeartIcon from "../heartIcon";
import { useNavigate } from "react-router-dom";

const PlanetItem = ({ title, climate, population, terrain, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/planets/${title}`);
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
        <Card.Title>{title}</Card.Title>
        <Card.Text
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Climate: {climate} <br />
          Population: {population} <br />
          Terrain: {terrain}
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
          <HeartIcon itemType={"planets"} name={title} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlanetItem;
