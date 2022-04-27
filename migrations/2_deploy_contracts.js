var fileTransfer = artifacts.require("./fileTransfer.sol")

module.exports = function (deployer) {
  deployer.deploy(fileTransfer)
}
