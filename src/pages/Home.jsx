import React, { useState } from "react";
import SearchResults from "../components/searchResults";
import SearchBar from "../components/searchBar";
import PageWrapper from "../components/pageWrapper";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import RecentSearchResult from "../components/recentSearchResult";

export default function Home() {
    const [results, setResults] = useState({});
    const [searches, setSearches] = useState([]);
    const [resultsCache, setResultsCache] = useState({});

    function updateResults(specName, newResults) {
        const newResultsCache = { ...resultsCache };
        newResultsCache[specName] = newResults;
        setResults(newResults);
        setResultsCache(newResultsCache);
    }

    function updateRecentSearches(searchString) {
        const newSearches = [...searches];
        const searchIndex = searches.indexOf(searchString);
        if (searchIndex >= 0) {
            newSearches.splice(searchIndex, 1);
        }
        newSearches.unshift(searchString);
        setSearches(newSearches);
    }

    function recallResults(specName) {
        resultsCache[specName]
            ? setResults(resultsCache[specName])
            : setResults({});
        updateRecentSearches(specName);
    }

    function deleteSearch(search) {
        const newSearches = [...searches];
        const searchIndex = newSearches.indexOf(search);
        if (searchIndex >= 0) {
            newSearches.splice(searchIndex, 1);
        }
        setSearches(newSearches);
    }

    const getResults = (e) => {
        e.preventDefault();
        const searchString = document.getElementById("spec-input").value;

        if (searchString == "") return;

        if (resultsCache[searchString]) {
            updateRecentSearches(searchString);
            return recallResults(searchString);
        }

        fetchSpecsAndUpdateResults(searchString);
    };

    function fetchSpecsAndUpdateResults(specName) {
        const uri = `/specs/${specName}`;

        fetch(uri)
            .then((response) => response.json())
            .then((results) => updateResults(specName, results))
            .then(() => updateRecentSearches(specName));
    }

    const recentSearchResults = searches.length ? (
        searches.map((search) => {
            return (
                <RecentSearchResult
                    search={search}
                    recallResults={recallResults}
                    deleteSearch={deleteSearch}
                />
            );
        })
    ) : (
        <Text color={"#aaa"} size={"sm"}>
            Your recent searches will appear here. Try searching for a BAC
            specification
        </Text>
    );

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
                        <Flex direction={"column"}>{recentSearchResults}</Flex>
                    </Box>
                    <Box px={8} flexGrow={1}>
                        <Flex flexDirection={"column"} gap={8}>
                            <Flex flexDirection={"column"} gap={4}>
                                <Heading size={"md"} color={"#444"} mb={4}>
                                    Instructions
                                </Heading>
                                <Text mb={4}>
                                    Use the search box below to search for a
                                    Boeing specification using its BAC number.
                                    The results show the specification number,
                                    followed up by its revision letter. IE:
                                    BAC5307AB indicates BAC5307 is at revision
                                    level AB. Below the specification number and
                                    revision level are the specification
                                    title/description and the last modified
                                    date. Please note that this data is only
                                    updated monthly by Boeing and may not
                                    represent the latest revision level of any
                                    given specification.
                                </Text>
                                <Text>
                                    Not sure where to start? Try searching for
                                    "BAC" to see all specifications.
                                </Text>
                            </Flex>
                            <SearchBar functions={getResults} />
                            <SearchResults results={results} />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </PageWrapper>
    );
}
