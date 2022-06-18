import { MockProvider } from "@ethereum-waffle/provider";
import { BigNumber } from "@ethersproject/bignumber";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { createArticleHash } from "../utils/hash";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import {
  ArticleMarketplace__factory,
  ArticleMarketplace as TArticleMarketplace,
} from "typechain";

describe("Marketplace Contract", function () {
  let ArticleMarketplace: ArticleMarketplace__factory;
  let articleMarketplace: TArticleMarketplace;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let provider: MockProvider;

  beforeEach(async function () {
    ArticleMarketplace = await ethers.getContractFactory("ArticleMarketplace");
    [owner, addr1] = await ethers.getSigners();
    articleMarketplace = await ArticleMarketplace.deploy();
    provider = waffle.provider;
  });

  describe("Deployment and Ownership", function () {
    it("Should set the right owner on deployment", async function () {
      expect(await articleMarketplace.getContractOwner()).to.equal(
        owner.address
      );
    });

    it("Should transfer ownership when called by owner", async function () {
      await articleMarketplace.transferOwnership(addr1.address);
      expect(await articleMarketplace.getContractOwner()).to.equal(
        addr1.address
      );
    });

    it("Should not transfer ownership when called by someone other than owner", async function () {
      // await articleMarketplace.ƒconnect(addr1).transferOwnership(addr1.address);
      await expect(
        articleMarketplace.connect(addr1).transferOwnership(addr1.address)
      ).to.be.revertedWith(`OnlyOwner`);
    });
  });

  describe("Transactions", function () {
    describe("Purchasing an Article", function () {
      let articleId: string;
      let email: string;
      let price: number;
      let articleIdHash: string;
      let emailHash: string;
      let articleHash: string;
      let proof: string;
      let articlePrice: BigNumber;

      // Reusable mock data for "Purchase an Article" test suite
      beforeEach(function () {
        articleId = "111021";
        email = "test@abv.bg";
        price = 0.015;

        articleIdHash = ethers.utils.id(articleId);
        emailHash = ethers.utils.id(email);

        articleHash = createArticleHash(articleId, addr1.address);

        proof = ethers.utils.solidityKeccak256(
          ["bytes32", "bytes32"],
          [emailHash, articleHash]
        );

        articlePrice = ethers.utils.parseEther(price.toString());
      });

      it("Should update contract balance when an article is purchased", async function () {
        await articleMarketplace
          .connect(addr1)
          .purchaseCourse(articleIdHash, proof, {
            value: articlePrice,
          });

        expect(
          (await provider.getBalance(articleMarketplace.address)).eq(
            articlePrice
          )
        );
      });

      it("Should store the correct values for the purchase in the contract mapping", async function () {
        await articleMarketplace
          .connect(addr1)
          .purchaseCourse(articleIdHash, proof, {
            value: articlePrice,
          });

        const article = await articleMarketplace
          .connect(addr1)
          .getCourseByHash(articleHash);

        expect(article.state).to.eq(0);
        expect(article.proof).to.eq(proof);
        expect(article.owner).to.eq(addr1.address);
        expect(article.price).to.eq(articlePrice);
      });

      it("Should revert tx when trying to purchase the same article > 1", async function () {
        await articleMarketplace
          .connect(addr1)
          .purchaseCourse(articleIdHash, proof, {
            value: articlePrice,
          });

        await expect(
          articleMarketplace
            .connect(addr1)
            .purchaseCourse(articleIdHash, proof, {
              value: articlePrice,
            })
        ).to.be.revertedWith(`CourseHasOwner`);
      });
    });
  });
});
