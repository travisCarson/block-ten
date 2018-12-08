import React, { Component } from "react";
import axios from "axios";
import BlockCard from "../BlockCard/BlockCard";
import BlockInfo from "../BlockInfo/BlockInfo";
import RawBlockInfo from "../RawBlockInfo/RawBlockInfo";
import Spinner from "../Spinner/Spinner";
import "./BlockList.css";

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: new Array(10).fill(1),
      loading: false,
      loadingBlockInfo: null,
      showRaw: null,
      rawBlocks: new Map()
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  // needs error handling
  async getBlocks() {
    const response = await axios.get("http://localhost:1111/");

    // REMOVE IN PRODUCTION: simulating network latency
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);
    return response.data;
  }

  // needs error handling
  async getRaw(id) {
    console.log(id);
    const cached = this.state.rawBlocks.has(id);
    if (cached) {
      return this.state.rawBlocks.get(id);
    }
    let rawBlock = await axios.post("http://localhost:1111/", {
      id
    });
    return rawBlock.data;
  }

  async handleButtonClick() {
    console.log("called");
    const loading = this.state.loading;
    if (!loading) {
      this.setState({
        loading: true
      });
      const blocks = await this.getBlocks();
      this.setState({
        blocks
      });
    }
    this.setState({
      loading: false
    });
  }

  async handleRowClick(id) {
    this.setState({
      loading: id
    });
    if (this.state.showRaw) {
      this.setState({
        loading: null,
        showRaw: null
      });
      return;
    }
    this.setState({
      loading: id
    });
    console.log(this.state.loading, this.state.showRaw);
    const rawBlock = await this.getRaw(id);
    this.setState({
      showRaw: id,
      rawBlocks: this.state.rawBlocks.set(id, rawBlock)
    });

    this.setState({
      loading: null
    });
  }

  componentDidMount() {
    this.handleButtonClick();
    console.log(this.state.blocks);
  }

  render() {
    const { blocks, loading, showRaw, rawBlocks } = this.state;
    let willRender;
    console.log("loading in render", loading);
    return (
      <>
        <button id="load-button" onClick={this.handleButtonClick}>
          Load
        </button>
        <div>
          {blocks.map((block, index) => {
            const { id, timestamp, actionCount } = block;
            if (loading === true || loading === id) {
              willRender = () => (
                <Spinner id={id} loadingRaw={loading === id} />
              );
            } else if (showRaw === id) {
              willRender = () => <RawBlockInfo rawData={rawBlocks.get(id)} />;
            } else {
              willRender = props => <BlockInfo {...props} />;
            }
            const rowShading = index % 2 === 0 ? "even" : "odd";
            return (
              // NEED TO FIX KEY
              <BlockCard
                key={index}
                id={id}
                timestamp={timestamp}
                actionCount={actionCount}
                handleClick={this.handleRowClick}
                render={willRender}
                shading={rowShading}
                {...block}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default BlockList;

// <LoadButton handleClick={this.handleButtonClick} text={buttonText} />
