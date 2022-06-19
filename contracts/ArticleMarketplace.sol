// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./Base.sol";

contract ArticleMarketplace is Base {
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

    receive() external payable {}

    function purchaseArticle(bytes32 articleId, bytes32 proof)
        external
        payable
        onlyWhenNotPaused
    {
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
}
