import React, { Component } from "react";
import axios from "axios";
import BlockCard from "../BlockCard/BlockCard";
import BlockInfo from "../BlockInfo/BlockInfo";
import RawBlockInfo from "../RawBlockInfo/RawBlockInfo";
import Spinner from "../Spinner/Spinner";
import dummyBlocks from "../../dummyBlocks";

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: dummyBlocks,
      loading: null,
      showRaw: null,
      rawBlocks: new Map()
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async getRaw(id) {
    console.log("ID IS", id);
    const cached = this.state.rawBlocks.has(id);
    if (cached) {
      return this.state.rawBlocks.get(id);
    }
    let rawBlock = await axios.post("http://localhost:1111/", {
      id
    });
    return rawBlock;
  }

  async handleClick(id) {
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
    const rawBlock = await this.getRaw(id);
    this.setState({
      showRaw: id,
      rawBlocks: this.state.rawBlocks.set(id, rawBlock)
    });

    console.log("here now");
    this.setState({
      loading: null
    });
  }

  render() {
    const { blocks, loading, showRaw, rawBlocks } = this.state;
    let willRender;
    return (
      <div>
        {blocks.map((block, index) => {
          // console.log("IN MAP", block);
          const { id, timestamp, actionCount } = block;
          if (loading === id) {
            console.log("LOADING LOADING", id);
            willRender = () => <Spinner id={id} />;
          } else if (showRaw === id) {
            // console.log("HERES THE STATE", rawBlock);
            willRender = () => <RawBlockInfo rawData={rawBlocks.get(id)} />;
          } else {
            willRender = props => <BlockInfo {...props} />;
          }
          const rowShading = index % 2 === 0 ? "even" : "odd";
          return (
            <BlockCard
              key={id}
              // probably should get rid of id here
              id={id}
              timestamp={timestamp}
              actionCount={actionCount}
              handleClick={this.handleClick}
              render={willRender}
              shading={rowShading}
              {...block}
            />
          );
        })}
      </div>
    );
  }
}

export default BlockList;
