import React from "react";
import PageWrapper from "../components/pageWrapper";
import { Box, Flex, Link, Text, Heading } from "@chakra-ui/react";

export default function About() {
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
                        <Heading size={"md"} color={"#444"}></Heading>
                    </Box>
                    <Box px={8} flexGrow={1}>
                        <Flex flexDirection={"column"} gap={8}>
                            <Flex flexDirection={"column"} gap={4}>
                                <Heading size={"md"} color={"#444"}>
                                    About
                                </Heading>
                                <Text>
                                    Boeing Speckle ("Boeing Spec. Cull") is an
                                    API to get the latest revision level of
                                    Boeing specifications. Boeing specification
                                    revision levels are updated monthly and
                                    published in one of many PDFs on the{" "}
                                    <Link href="http://active.boeing.com/doingbiz/d14426/index.cfm">
                                        D1-4426 website
                                    </Link>
                                    . Boeing Speckle scrapes these PDFs and
                                    provides an API for returning information
                                    about all or specific specifications in{" "}
                                    <Link href="https://en.wikipedia.org/wiki/JSON">
                                        JSON format.
                                    </Link>
                                </Text>
                                <Text>
                                    Boeing Speckle currently lists all BAC
                                    prefixed documents (no departures).
                                </Text>
                                <Text>
                                    Boeing Speckle is an open source project.
                                    View the source code on{" "}
                                    <Link href="https://github.com/NicNol/Boeing-Speckle">
                                        Github
                                    </Link>
                                    .
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </PageWrapper>
    );
}
