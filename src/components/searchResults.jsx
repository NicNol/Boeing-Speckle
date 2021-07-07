import React, { Component } from "react";

class SearchResults extends Component {
  render() {
    const { results } = this.props;

    return (
      <div className="search-results-area">
        <div class="number-results">Found XX similar:</div>
        {results.map((result) => {
          <SearchResult spec={result} />;
        })}
      </div>
    );
  }
}

export default SearchResults;
