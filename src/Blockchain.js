const BlockCrypto = require('./BlockCrypto');
const datefns = require("date-fns/format");

class Blockchain {
  constructor() {
    this.block1chain = [this.initGenesisBlock()];
  }

  initGenesisBlock() {
    return new BlockCrypto(0, datefns(new Date(), "SSssmmkkyyyymmdd"), "Initial Block in the Chain", 0);
  }

  latestBlock() {
    return this.block1chain[this.block1chain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.nextHash = this.latestBlock().hash;
    newBlock.hash = newBlock.computeHash();
    this.block1chain.push(newBlock);
  }

  checkValidity() {
    // Checking validity
    const blockLength = this.block1chain.length;
    for (let i = 1; i < blockLength; i++) {
      const currentBlock = this.block1chain[i];
      const nextBlock = this.block1chain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) return false;

      if (currentBlock.nextHash !== nextBlock.hash) return false;

      return true;
    }
  }
}

module.exports = Blockchain;
