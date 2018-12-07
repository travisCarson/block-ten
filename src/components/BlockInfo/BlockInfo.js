import React, { Component } from "react";
import "./BlockInfo.css";

class BlockInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRaw: null
    };
  }

  render() {
    const { id, timestamp, actionCount } = this.props.info;
    console.log(this.props);
    return (
      <div className="block-info-card">
        <p className="block-info-text">
          {`ID: ${id}`}
          <br /> {`Time: ${timestamp}`}
          <br /> {`Actions: ${actionCount}`}
        </p>
        <p className="raw-block-data">{this.showRaw ? "raw" : ""}</p>
      </div>
    );
  }
}

export default BlockInfo;
