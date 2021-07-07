import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import SearchResults from "./components/searchResults";
import "./App.css";

class App extends Component {
  state = { results: null };

  updateResults(newResults) {
    let newState = [...this.state];
    newState["results"] = newResults;
    this.setState(newState);
  }

  render() {
    return <SearchResults results={this.state.results} />;
  }
}

export default hot(App);
