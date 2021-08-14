import React, { Component } from "react";
import SearchResult from "./searchResult";

class SearchResults extends Component {
  render() {
    const { results } = this.props;

    return (
      <div className="search-results-area">
        <div className="number-results">
          Found {Object.keys(results).length} similar:
        </div>
        {Object.entries(results).map(([key, value]) => {
          return <SearchResult key={key} spec={value} />;
        })}
      </div>
    );
  }

  getResultsStyle() {
    let resultsStyle = "visibility: auto";
    // Object.keys(this.results).length == 0
    //   ? (resultsStyle = "visibility: hidden")
    //   : (resultsStyle = "visibility: auto");
    return resultsStyle;
  }
}

export default SearchResults;
