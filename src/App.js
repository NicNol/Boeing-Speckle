import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import SearchResults from "./components/searchResults";
import "./App.css";

class App extends Component {
  state = {
    results: {
      BAC001: {
        specification: "BAC001",
        revision: "PREFY",
        title: "PREFACE",
        date: "18-FEB-2021",
      },
      BAC5000: {
        specification: "BAC5000",
        revision: "AW",
        title: "SEALING, GENERAL",
        date: "10-MAY-2021",
      },
      "BAC5000-1": {
        specification: "BAC5000-1",
        revision: "B",
        title: "REPACKAGING AND FREEZING OF SEALANT BY END USERS",
        date: "27-JUN-2019",
      },
      BAC5001: {
        specification: "BAC5001",
        revision: "M",
        title: "FLUID LINES, FITTINGS AND PRESSURE TESTING",
        date: "30-SEP-2013",
      },
      "BAC5001-1": {
        specification: "BAC5001-1",
        revision: "H",
        title: "CUT OFF, END FORMING, HANDLING AND MARKING OF TUBES AND DUCTS",
        date: "05-JUL-2019",
      },
    },
  };

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
