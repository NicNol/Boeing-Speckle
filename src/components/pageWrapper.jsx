import React from "react";
import Header from "./header";
import Footer from "./footer";

import { Center, Flex } from "@chakra-ui/react";

export default function PageWrapper({ children }) {
    return (
        <Center bg={"#eee"} w={"100%"} h={"100%"}>
            <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                minH={"100vh"}
                w={"100%"}
                maxW={"1200px"}
                bg={"white"}
                shadow={"2xl"}
            >
                <Header />
                <Flex
                    flexGrow={1}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignSelf={"center"}
                    w={"100%"}
                >
                    {children}
                </Flex>
                <Footer />
            </Flex>
        </Center>
    );
}
