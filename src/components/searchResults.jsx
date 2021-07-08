import React, { Component } from "react";
import SearchResult from "./searchResult";

class SearchResults extends Component {
  render() {
    const { results } = this.props;

    return (
      <div className="search-results-area">
        <div className="number-results">Found XX similar:</div>
        {Object.entries(results).map(([key, value]) => {
          return <SearchResult key={key} spec={value} />;
        })}
      </div>
    );
  }
}

export default SearchResults;
