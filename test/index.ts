import { expect } from "chai";
import { ethers } from "hardhat";

describe("Transactions", function () {
  it("Should transfer tokens between accounts", async function () {
    const [owner] = await ethers.getSigners();

    const ArticleMarketplace = await ethers.getContractFactory(
      "ArticleMarketplace"
    );

    const hexCourseId =
      "0x643a2ddab7d95d4c37f100306a8aaa6ea95e526b20121f1b8afcdb53e17da9b3";
    const proof =
      "0xa36f1d550cc22aeca800885c253e51b8b266c42083dfe919fb1032bbb74e51cd";
    const coursePrice = "12871000000000000";
    const articleMarketplace = await ArticleMarketplace.deploy();

    await articleMarketplace.purchaseCourse(hexCourseId, proof, {
      value: coursePrice,
    });

    console.log("signers", owner.address);
    // Transfer 50 tokens from owner to addr1
    // await articleMarketplace.transfer(addr1.address, 50);
    // expect(await articleMarketplace.balanceOf(addr1.address)).to.equal(50);

    // // Transfer 50 tokens from addr1 to addr2
    // await articleMarketplace.connect(addr1).transfer(addr2.address, 50);
    // expect(await articleMarketplace.balanceOf(addr2.address)).to.equal(50);
  });
});
