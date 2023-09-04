const fs = require('fs');

const aapl = JSON.parse(fs.readFileSync('./seed-data/json-data/aapl.json'));
const amzn = JSON.parse(fs.readFileSync('./seed-data/json-data/amzn.json'));
const bp = JSON.parse(fs.readFileSync('./seed-data/json-data/bp.json'))
const fb = JSON.parse(fs.readFileSync('./seed-data/json-data/fb.json'))

const googl = JSON.parse(fs.readFileSync('./seed-data/json-data/googl.json'))
const mdb = JSON.parse(fs.readFileSync('./seed-data/json-data/mdb.json'))
const msft = JSON.parse(fs.readFileSync('./seed-data/json-data/msft.json'))
const net = JSON.parse(fs.readFileSync('./seed-data/json-data/net.json'))
const nflx = JSON.parse(fs.readFileSync('./seed-data/json-data/nflx.json'))


const shop = JSON.parse(fs.readFileSync('./seed-data/json-data/shop.json'))
const su = JSON.parse(fs.readFileSync('./seed-data/json-data/su.json'))
const team = JSON.parse(fs.readFileSync('./seed-data/json-data/team.json'))
const tsla = JSON.parse(fs.readFileSync('./seed-data/json-data/tsla.json'))



module.exports = {aapl, amzn, bp, fb,
    googl, mdb, msft, net, nflx, shop, su, team, tsla


};
