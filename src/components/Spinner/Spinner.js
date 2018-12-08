import React from "react";
import { string, bool } from "prop-types";
import "./Spinner.css";

const Spinner = ({ id, loadingRaw }) => (
  <>
    <p>{loadingRaw ? `Loading raw block data for ID ${id}` : ""}</p>
    <div className="spinner" />
    <p className="how-to-collapse">
      {loadingRaw ? "Click anywhere in this box to collapse when finished" : ""}
    </p>
  </>
);

Spinner.propTypes = {
  id: string,
  loadingRaw: bool
};

export default Spinner;
