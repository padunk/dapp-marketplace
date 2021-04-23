const Marketfair = artifacts.require("Marketfair");

module.exports = function (deployer) {
    deployer.deploy(Marketfair);
};
