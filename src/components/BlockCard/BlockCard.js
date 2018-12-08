import React from "react";
import { string, func } from "prop-types";
import "./BlockCard.css";

const BlockCard = props => (
  <div
    className={`block-card ${props.shading}`}
    onClick={() => props.handleClick(props.id)}
  >
    {props.render(props)}
  </div>
);

BlockCard.propTypes = {
  shading: string,
  handleClick: func,
  render: func
};

export default BlockCard;
