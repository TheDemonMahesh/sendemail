const Migrations = artifacts.require("Migrations");
// const finnal = artifacts.require("finnal");

module.exports = function(deployer, network , accounts) {
  deployer.deploy(Migrations);
  // deployer.deploy(finnal,"admin","admin").then(()=> console.log(finnal.address));
  // deployer.deploy(newdigital,finnal.address).then(()=> console.log(newdigital.address));
  
};
