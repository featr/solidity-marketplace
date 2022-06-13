const MarketplaceMigration = artifacts.require("ArticleMarketplace");

module.exports = function (deployer) {
  deployer.deploy(MarketplaceMigration);
};
