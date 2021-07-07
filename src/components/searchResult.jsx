import React, { Component } from "react";

class SearchResult extends Component {
  render() {
    const { specification, revision, title, date } = this.props;
    return (
      <div className="search-result">
        <div className="search-spec">
          {specification} Rev{revision}
        </div>
        <div className="search-title">{title}</div>
        <div className="search-date">{date}</div>
      </div>
    );
  }
}

export default SearchResult;
