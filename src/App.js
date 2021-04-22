import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Marketplace from "./abis/Marketplace.json";
import { Nav } from "./components/Nav/Nav";
import { CircularProgress, Flex } from "@chakra-ui/react";
import { Main } from "./components/Main/Main";
import { Loading } from "./components/Loading/Loading";

const App = () => {
    const [account, setAccount] = useState("");
    const [marketplace, setMarketplace] = useState();
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. Try MetaMask.");
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkID = await web3.eth.net.getId();
        const networkData = Marketplace.networks[networkID];

        if (networkData) {
            const marketplace = new web3.eth.Contract(
                Marketplace.abi,
                networkData.address
            );
            setMarketplace(marketplace);
            setLoading(false);
        } else {
            window.alert(
                "Marketplace contract not deployed to detected network."
            );
        }

        console.log(networkID);
    };

    useEffect(() => {
        loadWeb3();
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
                {loading ? <Loading /> : <Main />}
            </Flex>
        </Flex>
    );
};

export default App;
