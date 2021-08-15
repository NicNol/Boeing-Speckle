import React, { Component } from "react";
import SearchResult from "./searchResult";

class SearchResults extends Component {
  render() {
    const { results } = this.props;

    return (
      <div className="search-results-area">
        <div className={this.getResultsCountClasses(results)}>
          Found {Object.keys(results).length} results:
        </div>
        {Object.entries(results).map(([key, value]) => {
          return <SearchResult key={key} spec={value} />;
        })}
      </div>
    );
  }

  getResultsCountClasses(results) {
    let classString = "number-results ";
    classString += Object.keys(results).length == 0 ? "hidden" : "visible";
    return classString;
  }
}

export default SearchResults;
