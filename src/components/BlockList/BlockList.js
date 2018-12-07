import React, { Component } from "react";
import BlockInfo from "../BlockInfo/BlockInfo";
import dummyBlocks from "../../dummyBlocks";

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: dummyBlocks,
      loading: null,
      showRaw: null
    };
  }
  render() {
    const { blocks } = this.state;
    console.log(typeof blocks);
    return (
      <div>
        {blocks.map(block => {
          console.log(block);
          return (
            <BlockInfo
              key={block.id}
              id={block.id}
              timestamp={block.timestamp}
              actionCount={block.actionCount}
            />
          );
        })}
      </div>
    );
  }
}

export default BlockList;
