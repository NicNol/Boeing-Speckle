import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import SearchResults from "./components/searchResults";
import "./App.css";
import SearchBar from "./components/searchBar";

class App extends Component {
  state = {
    results: {},
  };

  updateResults(newResults) {
    let newState = { ...this.state };
    newState["results"] = newResults;
    this.setState(newState);
  }

  getResults = (e) => {
    e.preventDefault();

    const search_string = document.getElementById("spec-input").value;

    if (search_string == "") return;

    const uri = "/specs/" + search_string;

    fetch(uri)
      .then((response) => response.json())
      .then((results) => this.updateResults(results));
  };

  render() {
    return (
      <React.Fragment>
        <SearchBar functions={this.getResults} />
        <SearchResults results={this.state.results} />
      </React.Fragment>
    );
  }
}

export default hot(App);
