// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./Base.sol";
import "./PassMinter.sol";

contract ArticleMarketplace is Base {
    address internal minterAddress;

    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Article {
        uint256 id; // 32
        uint256 price; // 32
        bytes32 proof; // 32
        address owner; // 20
        State state; // 1
    }

    // mapping of the articleHash to Article data
    mapping(bytes32 => Article) private ownedArticles;

    // mapping of articleId to articleHash
    mapping(uint256 => bytes32) private ownedArticleHash;

    // number of all articles + id of the article
    uint256 private totalOwnedArticles;

    /// Article has already been purchased!
    error ArticleAlreadyPurchased();

    /// You have provided wrong transaction amount.
    error WrongTransactionAmount();

    /// You already have lifetime access.
    error RedundantPurchase();

    receive() external payable {}

    constructor() {
        minterAddress = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;
    }

    function purchaseArticle(bytes32 articleId, bytes32 proof)
        external
        payable
        onlyWhenNotPaused
    {
        if (msg.value != 0.05 ether) {
            revert WrongTransactionAmount();
        }

        PassMinter minter = PassMinter(minterAddress);

        if (minter.getTokenBalance(msg.sender) > 0) {
            revert RedundantPurchase();
        }

        bytes32 articleHash = keccak256(
            abi.encodePacked(articleId, msg.sender)
        );

        if (hasArticleOwnership(articleHash)) {
            revert ArticleAlreadyPurchased();
        }

        uint256 id = totalOwnedArticles++;
        ownedArticleHash[id] = articleHash;
        ownedArticles[articleHash] = Article({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function getArticleCount() external view returns (uint256) {
        return totalOwnedArticles;
    }

    function getArticleHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedArticleHash[index];
    }

    function getArticleByHash(bytes32 courseHash)
        external
        view
        returns (Article memory)
    {
        return ownedArticles[courseHash];
    }

    function hasArticleOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedArticles[courseHash].owner == msg.sender;
    }

    function setMinterAddress(address addr) private onlyOwner {
        minterAddress = addr;
    }
}
