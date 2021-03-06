import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
    return (
        <Flex className="navbar" rowGap={4} direction={"column"}>
            <Box className="navbar-header" textAlign={"center"}>
                <Heading
                    size={"2xl"}
                    fontWeight={"100"}
                    color={"transparent"}
                    background={"#bbb"}
                    backgroundClip={"text"}
                    textShadow={"0px 3px 3px rgba(255, 255, 255, 0.5)"}
                    overflow={"visible"}
                    lineHeight={"1.5"}
                >
                    Boeing Speckle
                </Heading>
            </Box>
            <Box className="nav-links" fontSize={24} textAlign={"center"}>
                <Link
                    as={RouterLink}
                    to="/"
                    _hover={{ textDecoration: "none" }}
                >
                    Home
                </Link>
                <Link
                    as={RouterLink}
                    to="/api"
                    _hover={{ textDecoration: "none" }}
                >
                    API
                </Link>
                <Link
                    as={RouterLink}
                    to="/about"
                    _hover={{ textDecoration: "none" }}
                >
                    About
                </Link>
            </Box>
        </Flex>
    );
}
