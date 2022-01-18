import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import SearchResults from "./components/searchResults";
import "./App.css";
import SearchBar from "./components/searchBar";
import PageWrapper from "./components/pageWrapper";
import { Box, Flex } from "@chakra-ui/react";

class App extends Component {
    state = {
        results: {},
        searches: [],
    };

    updateResults(newResults) {
        let newState = { ...this.state };
        newState["results"] = newResults;
        this.setState(newState);
    }

    updateRecentSearches(searchString) {
        let newState = { ...this.state };
        const searchIndex = newState["searches"].indexOf(searchString);
        if (searchIndex >= 0) {
            newState["searches"].splice(searchIndex, 1);
        }
        newState["searches"].unshift(searchString);
        this.setState(newState);
    }

    getResults = (e) => {
        e.preventDefault();

        const search_string = document.getElementById("spec-input").value;

        if (search_string == "") return;

        const uri = "/specs/" + search_string;

        fetch(uri)
            .then((response) => response.json())
            .then((results) => this.updateResults(results))
            .then(() => this.updateRecentSearches(search_string));
    };

    render() {
        return (
            <PageWrapper>
                <Box w={"100%"}>
                    <Flex w={"100%"} justifyContent={"flex-start"} py={8}>
                        <Box
                            h={"100%"}
                            w={"400px"}
                            display={["none", null, "block"]}
                            flexGrow={0}
                            px={8}
                        >
                            Recent Searches
                            <Flex direction={"column"}>
                                {this.state.searches.map((search) => {
                                    return <Flex>{search}</Flex>;
                                })}
                            </Flex>
                        </Box>
                        <Box px={8} flexGrow={1}>
                            <Box>
                                <SearchBar functions={this.getResults} />
                                <SearchResults results={this.state.results} />
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </PageWrapper>
        );
    }
}

export default hot(App);
