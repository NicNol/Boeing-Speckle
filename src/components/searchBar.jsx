import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const getResults = this.props.functions;

    return (
      <form action="" method="GET" id="spec-search-form" onSubmit={getResults}>
        <label htmlFor="specification">Specification Search</label>
        <br />
        <input
          type="text"
          id="spec-input"
          autoComplete="off"
          spellcheck="false"
          placeholder="BAC####"
        />
        <input type="submit" value="Search" className="button" />
      </form>
    );
  }
}

export default SearchBar;
