import React from "react";
import ReactJson from "react-json-view";
import { string } from "prop-types";
import "./RawBlock.css";

const RawBlock = ({ key, rawData }) => (
  <div className="raw-block-data">
    <ReactJson key={key} style={{ "word-wrap": "break-word" }} src={rawData} />
  </div>
);

RawBlock.propTypes = {
  rawData: string.isRequired,
  key: string
};

export default RawBlock;
