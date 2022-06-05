import React, { Component } from "react";
import { Box, Flex } from "@chakra-ui/react";

class SearchResult extends Component {
    render() {
        const { specification, revision, title, date } = this.props.spec;

        return (
            <Flex className="search-result" flexDirection={"column"} px={4}>
                <Box className="search-spec">
                    {specification}
                    {revision}
                </Box>
                <Box className="search-title">{title}</Box>
                <Box className="search-date">{date}</Box>
            </Flex>
        );
    }
}

export default SearchResult;
