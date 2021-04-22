import React from "react";
import { Box, Image, Badge, Flex, Heading } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const Home = () => {
    const product = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        title:
            "Modern home in city center in the heart of historic Los Angeles",
        currency: "ETH",
        formattedPrice: "1,900.00",
        reviewCount: 34,
        rating: 4,
    };
    return (
        <Flex flexDirection="column" color="whitesmoke">
            <Heading py="8" textAlign="center">
                Product List
            </Heading>
            <Flex flexDirection="column">
                <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Image src={product.imageUrl} alt={product.imageAlt} />
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme="teal"
                            >
                                New
                            </Badge>
                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {product.title}
                        </Box>

                        <Box>
                            <Box as="span" color="gray.500" fontSize="sm">
                                {product.currency}{" "}
                            </Box>
                            {product.formattedPrice}
                        </Box>

                        <Box d="flex" mt="2" alignItems="center">
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={
                                            i < product.rating
                                                ? "yellow.500"
                                                : "gray.300"
                                        }
                                    />
                                ))}
                            <Box
                                as="span"
                                ml="2"
                                color="gray.600"
                                fontSize="sm"
                            >
                                {product.reviewCount} reviews
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
};
