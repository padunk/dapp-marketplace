import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { ProductCard } from "../components/Product/ProductCard";

export const Home = ({ products, purchaseProduct }) => {
    return (
        <Flex flexDirection="column" color="whitesmoke">
            <Heading py="8" textAlign="center">
                Product List
            </Heading>
            <Flex>
                {products.length < 1 ? (
                    <h4>No products yet.</h4>
                ) : (
                    products.map((product) => {
                        return (
                            <ProductCard
                                product={product}
                                key={product.id}
                                purchaseProduct={purchaseProduct}
                            />
                        );
                    })
                )}
            </Flex>
        </Flex>
    );
};
