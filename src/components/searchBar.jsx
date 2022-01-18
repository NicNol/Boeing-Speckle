import React, { Component } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";

class SearchBar extends Component {
    render() {
        const getResults = this.props.functions;

        return (
            <form
                action=""
                method="GET"
                id="spec-search-form"
                onSubmit={getResults}
            >
                <Flex direction={"column"}>
                    <label htmlFor="specification">Specification Search</label>
                    <br />
                    <Input
                        type="text"
                        id="spec-input"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="BAC####"
                    />
                    <Button
                        type="submit"
                        value="Search"
                        className="button"
                        variant={"link"}
                    >
                        Search
                    </Button>
                </Flex>
            </form>
        );
    }
}

export default SearchBar;
