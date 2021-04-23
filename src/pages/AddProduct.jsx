import React, { useEffect, useState } from "react";
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
    Center,
} from "@chakra-ui/react";
import { ipfs } from "../libs/ipfs";
import { useHistory } from "react-router";

export const AddProduct = ({ createProduct }) => {
    const [buffer, setBuffer] = useState(null);
    const [fileSrc, setFileSrc] = useState(null);
    const [fileErrorMessage, setFileErrorMessage] = useState("");
    const [product, setProduct] = useState({ name: "", price: 0 });
    const [isValid, setIsValid] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        ipfs.files.add(buffer, (err, result) => {
            if (err) {
                setFileErrorMessage(err.name);
                return;
            }
            // convert the price to wei
            const price = window.web3.utils.toWei(
                product.price.toString(),
                "Ether"
            );
            console.log(result[0].hash);
            createProduct(product.name, price, result[0].hash);
            history.push("/");
        });
    };

    const handleImageFile = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setBuffer(null);
            setFileSrc(null);
            return;
        }
        const src = window.URL.createObjectURL(file);
        setFileSrc(src);

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (event) => {
            setBuffer(Buffer(reader.result));
        };
    };

    useEffect(() => {
        if (buffer !== null && product.name !== "" && product.price > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [buffer, product]);

    return (
        <Flex flexDir="column" alignItems="center" color="whitesmoke" p="8">
            <Heading py="4">Add Product</Heading>
            {fileSrc && (
                <Center boxSize="xs">
                    <Image src={fileSrc} objectFit="cover" alt="preview" />
                </Center>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl id="product-image" isRequired py="2">
                    <FormLabel>Product Image</FormLabel>
                    <Input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        variant="unstyled"
                        onChange={handleImageFile}
                    />
                    <FormErrorMessage>{fileErrorMessage}</FormErrorMessage>
                </FormControl>
                <FormControl id="product-name" isRequired py="2">
                    <FormLabel>Product Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        onChange={(event) =>
                            setProduct({
                                ...product,
                                name: event.target.value.trim(),
                            })
                        }
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="product-price" isRequired py="2">
                    <FormLabel>Product Price</FormLabel>
                    <InputGroup size="sm">
                        <InputLeftAddon children="ETH" bg="gray.500" />
                        <NumberInput
                            max={100000}
                            min={1}
                            name="price"
                            onChange={(_, valAsNum) =>
                                setProduct({ ...product, price: valAsNum })
                            }
                        >
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
                    isDisabled={!isValid}
                >
                    Add Product
                </Button>
            </form>
        </Flex>
    );
};
