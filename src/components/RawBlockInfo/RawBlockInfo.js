import React from "react";
import ReactJson from "react-json-view";
import "./RawBlock.css";

const RawBlock = ({ rawData }) => (
  <div className="raw-block-data">
    <ReactJson
      className="raw-block-json"
      style={{ "word-wrap": "break-word" }}
      src={rawData}
    />
  </div>
);

export default RawBlock;
