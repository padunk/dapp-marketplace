import React, { useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    NumberInput,
    NumberInputField,
    Image,
} from "@chakra-ui/react";
import { ipfs } from "../libs/ipfs";

export const AddProduct = () => {
    const [buffer, setBuffer] = useState();
    const [fileErrorMessage, setFileErrorMessage] = useState();
    const [fileHash, setFileHash] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        ipfs.files.add(buffer, (err, result) => {
            if (err) {
                setFileErrorMessage(err.name);
                return;
            }
            setFileHash(result[0].hash);
        });
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
        };
    };
    return (
        <Flex flexDir="column" alignItems="center" color="whitesmoke" p="8">
            <Heading py="4">Add Product</Heading>
            {fileHash && <Image src={`https://ipfs.io/ipfs/${fileHash}`} />}
            <FormControl id="product-image" isRequired py="2">
                <FormLabel>Product Image</FormLabel>
                <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    variant="unstyled"
                    onChange={handleChange}
                />
                <FormErrorMessage>{fileErrorMessage}</FormErrorMessage>
            </FormControl>
            <FormControl id="product-name" isRequired py="2">
                <FormLabel>Product Name</FormLabel>
                <Input type="text" />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl id="product-price" isRequired py="2">
                <FormLabel>Product Price</FormLabel>
                <InputGroup size="sm">
                    <InputLeftAddon children="ETH" bg="gray.500" />
                    <NumberInput max={100000} min={1}>
                        <NumberInputField />
                    </NumberInput>
                </InputGroup>
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <Button
                mt={4}
                colorScheme="blue"
                // isLoading={props.isSubmitting}
                type="submit"
                onSubmit={handleSubmit}
            >
                Add Product
            </Button>
        </Flex>
    );
};
