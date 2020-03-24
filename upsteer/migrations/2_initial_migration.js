const finnal = artifacts.require("finnal");
const newdigital = artifacts.require("newdigital");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(finnal,"admin","admin").then(function() {
  return deployer.deploy(newdigital, finnal.address)
  });
};


