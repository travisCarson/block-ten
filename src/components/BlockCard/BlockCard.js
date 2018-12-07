import React from "react";
import "./BlockCard.css";

const BlockCard = props => {
  return (
    <div
      className={`block-card ${props.shading}`}
      onClick={() => props.handleClick(props.id)}
    >
      {props.render(props)}
    </div>
  );
};

export default BlockCard;
