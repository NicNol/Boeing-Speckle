import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

export default function Header() {
    return (
        <Flex className="navbar" rowGap={4} direction={"column"}>
            <Box className="navbar-header">
                <Heading size={"3xl"}>
                    <span className="navbar-brand">Boeing Speckle</span>
                </Heading>
            </Box>
            <Box className="nav-links" fontSize={24}>
                <Link href="./index" _hover={{ textDecoration: "none" }}>
                    Home
                </Link>
                <Link href="./api" _hover={{ textDecoration: "none" }}>
                    API
                </Link>
                <Link href="./about" _hover={{ textDecoration: "none" }}>
                    About
                </Link>
            </Box>
        </Flex>
    );
}
