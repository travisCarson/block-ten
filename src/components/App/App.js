import React, { Component } from "react";
import "./App.css";

// import BlockInfo from "../BlockInfo/BlockInfo";
// import RawBlock from "../RawBlock/RawBlock";
// import LoadingCard from "../LoadingCard/LoadingCard";
// import dummyBlocks from "../../dummyBlocks";
// import dummyRawJson from "../../dummyRawJson";
import BlockList from "../BlockList/BlockList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BlockList />
        </header>
      </div>
    );
  }
}

export default App;
