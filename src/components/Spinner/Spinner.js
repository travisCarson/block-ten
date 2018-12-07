import React from "react";
import "./Spinner.css";

const Spinner = props => {
  return (
    <>
      <p>
        Loading raw block data for block ID: <br />
        {props.id}
      </p>
      <div className="spinner" />
      <p className="how-to-collapse">Click anywhere in this box to collapse</p>
    </>
  );
};

export default Spinner;
