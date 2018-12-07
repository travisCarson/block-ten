import React from "react";
import Spinner from "../Spinner/Spinner";
import "./LoadingCard.css";

const LoadingCard = props => (
  <div className="loading-card">
    <Spinner id={props.id} />
  </div>
);

export default LoadingCard;
