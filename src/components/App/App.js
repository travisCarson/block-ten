import React, { Component } from "react";
import "./App.css";

import BlockInfo from "../BlockInfo/BlockInfo";
import RawBlock from "../RawBlock/RawBlock";
import LoadingCard from "../LoadingCard/LoadingCard";
import dummyBlocks from "../../dummyBlocks";
import dummyRawJson from "../../dummyRawJson";
import BlockList from "../BlockList/BlockList";

class App extends Component {
  render() {
    console.log(dummyBlocks);
    return (
      <div className="App">
        <header className="App-header">
          <BlockList />
        </header>
      </div>
    );
  }
}

// <LoadingCard id={dummyBlocks[0].id} />
//          // <RawBlock rawBlock={dummyRawJson} />

export default App;
