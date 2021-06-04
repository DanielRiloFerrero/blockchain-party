const Blockchain = require("./blockchain");
const BlockCrypto = require("./BlockCrypto");
const datefns = require("date-fns/format");
const randomstring = require("randomstring");
const fs = require('fs');

let thecoin = new Blockchain();
const totalBC = Math.floor(Math.random() * 1000);

for (let i = 0; i < totalBC; i++) {
  thecoin.addNewBlock(
    new BlockCrypto(
      thecoin.latestBlock().index + 1,
      datefns(new Date(), "SSssmmkkyyyymmdd"),
      {
        sender: randomstring.generate(7),
        recipient: randomstring.generate(7),
        quantity: Math.floor(Math.random() * 10000)
      }
    )
  );
}
const thewholecoin = JSON.stringify(thecoin, null, 4);

fs.writeFile('./src/thecoin.json', thewholecoin, (err) => {
  if (err) throw err;
  console.log("JSON data is saved.");
});
