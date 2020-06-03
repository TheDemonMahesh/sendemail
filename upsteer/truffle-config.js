/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('truffle-hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // rpc: {
  // host:"103.67.238.177",
  // port:6300
  // },
 networks: {
  
    development: {
     host: "103.67.238.177",     // Localhost (default: none)
     port: 30303,            // Standard Ethereum port (default: none)
     network_id: "5777", 
     websockets: true        // Any network (default: none)
    },

  //   development: {
  // host: "103.67.238.177", //our network is running on localhost
  // port: 6300, // port where your blockchain is running
  // network_id: "*",
  // from: "0x87c7b13266dA913e8d5726643F49344025991916", // use the account-id generated during the setup process
  // // gas: 20000000
  // } ,
 },


// module.exports = {
 

//   networks: {
  
    // development: {
    //  host: "103.67.238.177",     // Localhost (default: none)
    //  port: 30303,            // Standard Ethereum port (default: none)
    //  network_id: "1221", 
    //  websockets: true        // Any network (default: none)
    // },

  //   private:{

  //     provider: () => new HttpProvider('http://103.67.238.177:6300'),
  //     // host: "103.67.238.177", 
  //     // port: 30303, 
  //     network_id: 1221,
  //     production: true,
  //     websockets: true   
  
  //   },
  //   test: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "http://103.67.238.177:6300/");
  //     },
  //     network_id: 1221,
  //     from: "0x87c7b13266dA913e8d5726643F49344025991916", // use the account-id generated during the setup process
  //     gas: 3000000
  //   },
  // },


  
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "petersburg"
      }
    }
  }
}
