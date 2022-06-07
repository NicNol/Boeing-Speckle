import React from "react";
import PageWrapper from "../components/pageWrapper";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

export default function Api() {
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
                                    API
                                </Heading>
                                <Text>
                                    All API calls are made relative to the base
                                    url:{" "}
                                    <code class="no-wrap">{`${window.location.protocol}//${window.location.hostname}`}</code>
                                    .
                                </Text>
                                <Text>
                                    Users can make API calls by sending HTTP GET
                                    requests using the following URL template:{" "}
                                    <code class="no-wrap">
                                        /specs/%Specification%
                                    </code>
                                </Text>

                                <Text>
                                    Replace <code>%Specification%</code> with
                                    the name of a Boeing BAC specification or a
                                    search string. <br />
                                    <br />
                                    For example,{" "}
                                    <code class="no-wrap">
                                        /specs/BAC5307
                                    </code>{" "}
                                    will return the following matching JSON
                                    objects:
                                    <br />
                                    <br />
                                    <code class="code-block">
                                        [ <br />
                                        <span class="tab">
                                            &#123;
                                            <br />
                                            <span class="tab">
                                                "_id":"60c2b5af69370525fcfee73b",
                                                <br />
                                                "specification":"BAC5307-1",
                                                <br />
                                                "revision":"E",
                                                <br />
                                                "title":"PART MARKING OF MACHINE
                                                READABLE INFORMATION WITH
                                                LABELS",
                                                <br />
                                                "date":"06-APR-2018"
                                                <br />
                                            </span>
                                            &#125;,
                                            <br />
                                            &#123;
                                            <br />
                                            <span class="tab">
                                                "_id":"60c2b5af69370525fcfee73a",
                                                <br />
                                                "specification":"BAC5307",
                                                <br />
                                                "revision":"AA", <br />
                                                "title":"PART MARKING", <br />
                                                "date":"22-APR-2020"
                                            </span>
                                            &#125;
                                        </span>
                                        ]
                                    </code>
                                </Text>
                                <Text>
                                    Note that search strings may be partial
                                    matches. Calls such as{" "}
                                    <code class="insert_url">/specs/5307</code>{" "}
                                    will return the same results.
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </PageWrapper>
    );
}
