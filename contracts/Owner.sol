// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Owner {
    address payable internal owner;

    /// Only owner can access this function!
    error OnlyOwner();

    constructor() {
        setContractOwner(msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }
}
