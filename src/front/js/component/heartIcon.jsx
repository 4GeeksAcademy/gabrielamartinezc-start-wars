import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Context } from "../store/appContext"; 

const HeartIcon = ({ itemType, name }) => {

  const { store, actions } = useContext(Context); 
  const [isLiked, setIsLiked] = useState(
    store.favorites.some(
      (item) => item.name === name && item.itemType === itemType
    )
  );

  const handleClick = () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      // Add to favorites if not already liked
      actions.addFavorite({ itemType, name });
    } else {
      // Remove from favorites if already liked
      actions.removeFavorite({ itemType, name });
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: "pointer", color: isLiked ? "red" : "gray" }}
    >
      <FontAwesomeIcon
        icon={isLiked ? faHeartSolid : faHeartRegular}
        size="2x"
      />
    </div>
  );
};

export default HeartIcon;
