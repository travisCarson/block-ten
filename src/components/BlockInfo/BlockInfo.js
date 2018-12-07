import React, { Component } from "react";
import "./BlockInfo.css";

class BlockInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRaw: null,
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event.target);
    this.setState({
      loading: true
    });
  }

  render() {
    const { id, timestamp, actionCount } = this.props;
    const { loading } = this.state;
    console.log(this.props);
    return (
      <div className="block-info-card" onClick={this.handleClick}>
        <p className="block-info-text">
          {`ID: ${id}`}
          <br /> {`Time: ${timestamp}`}
          <br /> {`Actions: ${actionCount}`}
        </p>
        <p className="raw-block-data">{this.showRaw ? "raw" : ""}</p>)
      </div>
    );
  }
}

export default BlockInfo;
