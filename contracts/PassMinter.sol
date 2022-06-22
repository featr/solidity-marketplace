// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Owned.sol";

contract PassMinter is ERC721URIStorage, Owned {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    /// You have provided wrong transaction amount.
    error WrongTransactionAmount();

    constructor() ERC721("ReadingPass", "Pass") {}

    function mintNFT(string memory tokenURI) public payable returns (uint256) {
        if (msg.value != 0.5 ether) {
            revert WrongTransactionAmount();
        }
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function getTokenBalance(address owner) public view returns (uint256) {
        return balanceOf(owner);
    }

    function getTokenBalance() external view returns (uint256) {
        return getTokenBalance(msg.sender);
    }
}
