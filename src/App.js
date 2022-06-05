import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import SearchResults from "./components/searchResults";
import "./App.css";
import SearchBar from "./components/searchBar";
import PageWrapper from "./components/pageWrapper";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

class App extends Component {
    state = {
        results: {},
        searches: [],
        cache: {},
    };

    updateResults(specName, newResults) {
        let newState = { ...this.state };
        newState.results = newResults;
        newState.cache[specName] = newResults;
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

    recallResults(specName) {
        let newState = { ...this.state };
        newState["results"] = this.state.cache[specName];
        this.setState(newState);
    }

    getResults = (e) => {
        e.preventDefault();

        const searchString = document.getElementById("spec-input").value;

        if (searchString == "") return;

        const uri = "/specs/" + searchString;

        fetch(uri)
            .then((response) => response.json())
            .then((results) => this.updateResults(searchString, results))
            .then(() => this.updateRecentSearches(searchString));
    };

    render() {
        return (
            <PageWrapper>
                <Box w={"100%"}>
                    <Flex w={"100%"} justifyContent={"flex-start"} py={8}>
                        <Box
                            h={"100%"}
                            w={"300px"}
                            minW={"300px"}
                            maxW={"300px"}
                            display={["none", null, "block"]}
                            flexGrow={0}
                            px={8}
                        >
                            <Heading size={"md"} color={"#444"}>
                                Recent Searches
                            </Heading>
                            <Flex direction={"column"}>
                                {this.state.searches.map((search) => {
                                    return (
                                        <Flex>
                                            <Text
                                                color={"navy"}
                                                fontWeight={"bold"}
                                                _hover={{
                                                    textDecoration: "underline",
                                                    cursor: "pointer",
                                                }}
                                                display={"inline"}
                                                onClick={() =>
                                                    this.recallResults(search)
                                                }
                                                key={search}
                                            >
                                                {search}
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </Flex>
                        </Box>
                        <Box px={8} flexGrow={1}>
                            <Flex flexDirection={"column"} gap={8}>
                                <Box>
                                    <Heading size={"md"} color={"#444"}>
                                        Instructions
                                    </Heading>
                                    <Text>
                                        Use the search box below to search for a
                                        Boeing specification using its BAC
                                        number. The results show the
                                        specification number, followed up by its
                                        revision letter. IE: BAC5307AB indicates
                                        BAC5307 is at revision level AB. Below
                                        the specification number and revision
                                        level are the specification
                                        title/description and the last modified
                                        date. Please note that this data is only
                                        updated monthly by Boeing and may not
                                        represent the latest revision level of
                                        any given specification.
                                    </Text>
                                    <Text>
                                        Not sure where to start? Try searching
                                        for "BAC" to see all specifications.
                                    </Text>
                                </Box>
                                <SearchBar functions={this.getResults} />
                                <SearchResults results={this.state.results} />
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </PageWrapper>
        );
    }
}

export default hot(App);
