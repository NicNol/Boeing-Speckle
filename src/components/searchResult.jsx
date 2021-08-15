import React, { Component } from "react";

class SearchResult extends Component {
  render() {
    const { specification, revision, title, date } = this.props.spec;

    return (
      <div className="search-result">
        <div className="search-spec">
          {specification}
          {revision}
        </div>
        <div className="search-title">{title}</div>
        <div className="search-date">{date}</div>
      </div>
    );
  }
}

export default SearchResult;
