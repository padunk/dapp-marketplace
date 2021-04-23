import React from "react";
import { Box, Image, Badge, Button } from "@chakra-ui/react";

export const ProductCard = ({ product }) => {
    return (
        <Box maxW="60" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image
                src={`https://ipfs.io/ipfs/${product.imageHash}`}
                alt={product.name}
            />
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {product.purchased ? "Sold" : "Available"}
                    </Badge>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    textTransform="capitalize"
                    color="gray.500"
                >
                    {product.name}
                </Box>
                <Box
                    d="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box fontSize="xl">
                        <Box as="span" fontSize="sm">
                            ETH{" "}
                        </Box>
                        {product.price / 10 ** 18}
                    </Box>

                    <Button
                        borderRadius="full"
                        bg="teal.400"
                        _hover={{
                            bg: "teal.200",
                        }}
                        color="blackAlpha.900"
                    >
                        Buy
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
