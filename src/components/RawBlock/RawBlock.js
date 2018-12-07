import React from "react";
import ReactJson from "react-json-view";
import "./RawBlock.css";

const RawBlock = props => (
  <div className="raw-block-data">
    <ReactJson
      className="raw-block-json"
      style={{ "word-wrap": "break-word" }}
      src={props.rawBlock}
    />
  </div>
);

export default RawBlock;
