const CustomerInfo = artifacts.require("CustomerInfo");

module.exports = function(deployer) {
  deployer.deploy(CustomerInfo);
};
