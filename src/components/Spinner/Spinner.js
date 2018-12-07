import React from "react";
import "./Spinner.css";

const Spinner = props => (
  <>
    <p>
      Loading raw block data for block ID: <br />
      {props.id}
    </p>
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </>
);

export default Spinner;
