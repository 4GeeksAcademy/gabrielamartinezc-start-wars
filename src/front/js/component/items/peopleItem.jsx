import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../styles/itemPreviewComponent.css";
import HeartIcon from "../heartIcon.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";

const PeopleItem = ({ title, hairColor, eyesColor, gender, imgSource }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/people/${title}`);
  };

  return (
    <Card className="card-custom-border" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgSource} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Gender:{gender} <br />
          Hair Color: {hairColor} <br />
          Eyes Color: {eyesColor}
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
          <HeartIcon itemType={"people"} name={title} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PeopleItem;
