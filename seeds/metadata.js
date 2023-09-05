/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stock_metadata').del();
  await knex('stock_metadata').insert([
      {
        "stock_symbol": "aapl",
        "company_name": "Apple Inc."

      },
      {
        "stock_symbol": "amzn",
        "company_name": "Amazon.com, Inc."

      },
      {
        "stock_symbol": "bp",
        "company_name": "BP p.l.c."

      },
      {
        "stock_symbol": "fb",
        "company_name": "Facebook, Inc."

      },
      {
        "stock_symbol": "googl",
        "company_name": "Alphabet Inc."

      },
      {
        "stock_symbol": "mdb",
        "company_name": "MongoDB, Inc."

      },
      {
        "stock_symbol": "msft",
        "company_name": "Microsoft Corporation"

      },
      {
        "stock_symbol": "net",
        "company_name": "Cloudflare, Inc."

      },
      {
        "stock_symbol": "nflx",
        "company_name": "Netflix, Inc."

      },
      {
        "stock_symbol": "shop",
        "company_name": "Shopify Inc."

      },
      {
        "stock_symbol": "su",
        "company_name": "Suncor Energy  Inc."
      },
      {
        "stock_symbol": "team",
        "company_name": "Atlassian Corporation Plc"
      },
      {
        "stock_symbol": "tsla",
        "company_name": "Tesla, Inc."
      },
    ])
};
