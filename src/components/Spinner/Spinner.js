import React from "react";
import "./Spinner.css";

const Spinner = props => {
  return (
    <>
      <p>
        {props.loadingRaw ? `Loading raw block data for ID ${props.id}` : ""}
      </p>
      <div className="spinner" />
      <p className="how-to-collapse">
        {props.loadingRaw
          ? "Click anywhere in this box to collapse when finished"
          : ""}
      </p>
    </>
  );
};

export default Spinner;
