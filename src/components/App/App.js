import React, { Component } from "react";
import "./App.css";

import BlockInfo from "../BlockInfo/BlockInfo";
import RawBlock from "../RawBlock/RawBlock";
import dummyBlocks from "../../dummyBlocks";
import dummyRawJson from "../../dummyRawJson";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BlockInfo info={dummyBlocks} />
          <RawBlock rawBlock={dummyRawJson} />
        </header>
      </div>
    );
  }
}

export default App;
