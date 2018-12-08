import React, { Component } from "react";
import "./App.css";

import Header from "../Header/Header";
import BlockList from "../BlockList/BlockList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <BlockList />
        </header>
      </div>
    );
  }
}

export default App;
