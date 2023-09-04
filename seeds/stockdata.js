/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const stockData = require('../seed-data/stocksGetJson');
const {aapl, amzn, bp, fb,
  googl, mdb, msft, net, nflx, shop, su, team, tsla} = stockData;
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('aapl').del()
  await knex('aapl').insert(aapl);
  await knex('amzn').del()
  await knex('amzn').insert(amzn);
  await knex('bp').del()
  await knex('bp').insert(bp);
  await knex('fb').del()
  //await knex('fb').insert(fb);
  await knex('googl').del()
  await knex('googl').insert(googl);
  await knex('mdb').del()
  await knex('mdb').insert(mdb);
  await knex('msft').del()
  await knex('msft').insert(msft);
  await knex('nflx').del()
  await knex('nflx').insert(nflx);
  await knex('nflx').del()
  await knex('nflx').insert(nflx);
  await knex('shop').del()
  await knex('shop').insert(shop);
  await knex('su').del()
  await knex('su').insert(su);
  await knex('team').del()
  await knex('team').insert(team);
  await knex('tsla').del()
  await knex('tsla').insert(tsla);
};
