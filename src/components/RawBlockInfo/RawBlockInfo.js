import React from "react";
import ReactJson from "react-json-view";
import { object, string } from "prop-types";
import "./RawBlock.css";

const RawBlock = ({ key, rawJson }) => (
  <div className="raw-block-data">
    <ReactJson key={key} style={{ "word-wrap": "break-word" }} src={rawJson} />
  </div>
);

RawBlock.propTypes = {
  rawJson: object.isRequired,
  key: string
};

export default RawBlock;
