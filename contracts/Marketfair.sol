// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

contract Marketfair {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;
    mapping(address=>Image[]) private images;

    struct Image{
        string imageHash;
        string ipfsInfo;
    }

    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        string imageHash;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() {
        name = 'Dapp Marketfair';
    }

    function uploadImage(string memory _hash, string memory _ipfs) public{
        images[msg.sender].push(Image(_hash, _ipfs)); //
    }

    function createProduct(string memory _name, uint _price, string memory _imageHash) public {
        // require a valid name
        require(bytes(_name).length > 0);
        // require a valid price
        require(_price > 0);
        // increment product count
        productCount++;
        // create product
        products[productCount] = Product(productCount, _name, _price, msg.sender, _imageHash, false);

        // trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        // fetch the product
        Product memory _product = products[_id];

        // fetch the owner
        address payable _seller = payable(_product.owner);

        // check product id is valid
        require(_product.id > 0 && _product.id <= productCount);

        // check there is enough ether
        require(msg.value >= _product.price);

        // check the products is still available
        require(!_product.purchased);

        // check the buyer is not the seller
        require(_seller != msg.sender);

        // pay the seller
        _seller.transfer(msg.value);

        // transfer ownership to the buyer
        _product.owner = msg.sender;

        // mark as purchased
        _product.purchased = true;

        // update the product
        products[_id] = _product;

        // trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, payable(msg.sender), true);
    }
}