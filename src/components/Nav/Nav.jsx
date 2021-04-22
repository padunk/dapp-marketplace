import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Heading, List, ListItem, Link, Spacer } from "@chakra-ui/react";

export const Nav = () => {
    return (
        <Flex
            as="nav"
            color="whitesmoke"
            h="70px"
            bgColor="gray.700"
            justifyContent="space-between"
            alignItems="center"
        >
            <Heading
                fontWeight="thin"
                textTransform="uppercase"
                color="orange.500"
                px="4"
            >
                <a href="/home">Dapp Marketplace</a>
            </Heading>

            <List display="flex" justifyContent="center" alignItems="center">
                <ListItem paddingRight="4">
                    <Link as={RouterLink} to="/">
                        Home
                    </Link>
                </ListItem>
                <ListItem paddingRight="4">
                    <Link as={RouterLink} to="/add-product">
                        Add Product
                    </Link>
                </ListItem>
            </List>
        </Flex>
    );
};
