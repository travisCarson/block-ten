import React from "react";
import { string, number, func } from "prop-types";
import "./BlockInfo.css";

const BlockInfo = ({ id, timestamp, actionCount, handleClick, num }) => (
  <div className="block-info-text" id={id}>
    <br /> {`Block number: ${num}`}
    <br /> {`ID: ${id}`}
    <br /> {`Time: ${timestamp}`}
    <br /> {`Actions: ${actionCount}`}
  </div>
);

BlockInfo.propTypes = {
  num: number.isRequired,
  id: string.isRequired,
  timestamp: string.isRequired,
  actionCount: number.isRequired,
  handleClick: func.isRequired
};

export default BlockInfo;
