import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiDelete } from "react-icons/fi";

export default function RecentSearchResult({
    search,
    deleteSearch,
    recallResults,
}) {
    return (
        <Flex
            _hover={{ backgroundColor: "#00008033" }}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Text
                color={"navy"}
                fontWeight={"bold"}
                _hover={{
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
                display={"inline"}
                onClick={() => recallResults(search)}
                key={search}
                px={2}
            >
                {search}
            </Text>
            <Icon
                as={FiDelete}
                w={10}
                h={10}
                color={"navy"}
                px={2}
                onClick={() => deleteSearch(search)}
                transition={"0.2s"}
                _hover={{ color: "red" }}
            />
        </Flex>
    );
}
