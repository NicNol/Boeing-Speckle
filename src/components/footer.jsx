import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box className="footer" w={"100%"} px={8} py={16}>
            <Text>
                Boeing Speckle is an{" "}
                <Link href="https://github.com/NicNol/Boeing-Speckle">
                    open source project{" "}
                </Link>
                developed by{" "}
                <Link href="https://github.com/NicNol">Nic Nolan</Link>.
            </Text>
        </Box>
    );
}
