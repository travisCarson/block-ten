import React from "react";
import "./BlockInfo.css";

const BlockInfo = ({ id, timestamp, actionCount, handleClick }) => {
  return (
    <div className="block-info-text" id={id}>
      {`ID: ${id}`}
      <br /> {`Time: ${timestamp}`}
      <br /> {`Actions: ${actionCount}`}
    </div>
  );
};

export default BlockInfo;
