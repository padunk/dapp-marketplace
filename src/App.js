import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Marketfair from "./abis/Marketfair.json";
import { Flex } from "@chakra-ui/react";
import { Nav } from "./components/Nav/Nav";
import { MainRoute } from "./Router";
import { Loading } from "./components/Loading/Loading";

const App = () => {
    const [account, setAccount] = useState("");
    const [marketfair, setMarketfair] = useState();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.send("eth_requestAccounts");
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. Try MetaMask.");
        }
    };

    const requestAccounts = async () => {
        const web3 = window.web3;
        try {
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const networkID = await web3.eth.net.getId();
        const networkData = Marketfair.networks[networkID];

        if (networkData) {
            const marketfair = new web3.eth.Contract(
                Marketfair.abi,
                networkData.address
            );
            const productCount = await marketfair.methods.productCount().call();
            if (products.length > 0) {
                setProducts([]);
            }
            for (let i = 1; i <= productCount; i++) {
                const prod = await marketfair.methods.products(i).call();
                setProducts(products.concat(prod));
            }
            setMarketfair(marketfair);
            setLoading(false);
        } else {
            setLoading(false);
            window.alert(
                "Marketfair contract not deployed to detected network."
            );
        }
    };

    const createProduct = (name, price, imageHash) => {
        setLoading(true);
        marketfair.methods
            .createProduct(name, price, imageHash)
            .send({ from: account })
            .on("receipt", () => {
                setLoading(false);
            })
            .on("error", (err) => {
                setLoading(false);
                window.alert(`${err.message}`);
            });
    };

    const purchaseProduct = (id, price) => {
        setLoading(true);
        marketfair.methods
            .purchaseProduct(id)
            .send({
                from: account,
                value: price,
            })
            .on("receipt", () => {
                setLoading(false);
                // refresh the ownership
                loadBlockchainData();
            })
            .on("error", (err) => {
                setLoading(false);
                window.alert(`${err.message}`);
            });
    };

    useEffect(() => {
        loadWeb3();
        requestAccounts();
        loadBlockchainData();
    }, []);

    return (
        <Flex
            bgColor="gray.900"
            color="whiteAlpha.100"
            flexDirection="column"
            minH="100vh"
        >
            <Nav />
            <Flex flexDir="column" alignItems="center" h="full" flex="1 1 auto">
                {loading ? (
                    <Loading />
                ) : (
                    <MainRoute
                        createProduct={createProduct}
                        products={products}
                        purchaseProduct={purchaseProduct}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default App;
