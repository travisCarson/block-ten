import React from "react";
import { string, number, func } from "prop-types";
import "./BlockInfo.css";

const BlockInfo = ({ id, timestamp, actionCount, handleClick }) => (
  <div className="block-info-text" id={id}>
    {`ID: ${id}`}
    <br /> {`Time: ${timestamp}`}
    <br /> {`Actions: ${actionCount}`}
  </div>
);

BlockInfo.propTypes = {
  id: string.isRequired,
  timestamp: string,
  actionCount: number,
  handleClick: func
};

export default BlockInfo;
