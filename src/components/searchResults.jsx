import React, { Component } from "react";
import SearchResult from "./searchResult";
import { Box, Flex, Heading } from "@chakra-ui/react";

class SearchResults extends Component {
    render() {
        const { results } = this.props;

        return (
            <Box className="search-results-area">
                <Heading
                    className={this.getResultsCountClasses(results)}
                    size={"md"}
                    color={"#444"}
                >
                    Found {Object.keys(results).length}{" "}
                    {Object.keys(results).length === 1 ? "result" : "results"}:
                </Heading>
                {Object.entries(results).map(([key, value]) => {
                    return <SearchResult key={key} spec={value} />;
                })}
            </Box>
        );
    }

    getResultsCountClasses(results) {
        let classString = "number-results ";
        classString += Object.keys(results).length == 0 ? "hidden" : "visible";
        return classString;
    }
}

export default SearchResults;
