const IPFS = require("ipfs-api");
export const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});
