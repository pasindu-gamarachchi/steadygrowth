/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('address');
      table.string('phone');
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("stock_metadata", (table)=> {
      table.string("stock_symbol").primary()
      table.string('company_name')
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("user_preferences", (table) => {
        table.increments("pref_id").primary();
        table.integer("user_id").unsigned().notNullable()
        table.string("stock_symbol").notNullable()
        table.string('preference_description').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .foreign("user_id")
          .references("id")
          .inTable("user")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
        table
          .foreign("stock_symbol")
          .references("stock_symbol")
          .inTable("stock_metadata")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
      })
    .createTable("portfolio", (table) => {
        table.increments("port_id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.string("stock_symbol").notNullable();
        table.string('purchase_date').notNullable();
        table.decimal('purchase_price').notNullable();
        table.integer('purchase_shares').unsigned().notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        table
          .foreign("user_id")
          .references("id")
          .inTable("user")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
        table
          .foreign("stock_symbol")
          .references("stock_symbol")
          .inTable("stock_metadata")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
      })
    .createTable("aapl",(table) => {
       table.integer("index").unsigned();
       table.string("Date");
       table.decimal("Open");
       table.decimal("High");
       table.decimal("Low");
       table.decimal("Close");
       table.decimal("Adj Close");
       table.string("Volume");
       table.string("Symbol");
       table.string("Nasdaq Traded");
       table.string("Security Name");
       table.string("Listing Exchange");
       table.string("Market Category");
       table.string("ETF");
       table.decimal("Round Lot Size");
       table.string("Test Issue");
       table.string("Financial Status");
       table.string("CQS Symbol");
       table.string("NASDAQ Symbol");
       table.string("NextShares");
       table.decimal("daily_change");
       table.decimal("abs_daily_change");
    })
    .createTable("amzn",(table) => {
      table.integer("index").unsigned();
      table.string("Date");
      table.decimal("Open");
      table.decimal("High");
      table.decimal("Low");
      table.decimal("Close");
      table.decimal("Adj Close");
      table.string("Volume");
      table.string("Symbol");
      table.string("Nasdaq Traded");
      table.string("Security Name");
      table.string("Listing Exchange");
      table.string("Market Category");
      table.string("ETF");
      table.decimal("Round Lot Size");
      table.string("Test Issue");
      table.string("Financial Status");
      table.string("CQS Symbol");
      table.string("NASDAQ Symbol");
      table.string("NextShares");
      table.decimal("daily_change");
      table.decimal("abs_daily_change");
   })
    .createTable("bp",(table) => {
      table.integer("index").unsigned();
      table.string("Date");
      table.decimal("Open");
      table.decimal("High");
      table.decimal("Low");
      table.decimal("Close");
      table.decimal("Adj Close");
      table.string("Volume");
      table.string("Symbol");
      table.string("Nasdaq Traded");
      table.string("Security Name");
      table.string("Listing Exchange");
      table.string("Market Category");
      table.string("ETF");
      table.decimal("Round Lot Size");
      table.string("Test Issue");
      table.string("Financial Status");
      table.string("CQS Symbol");
      table.string("NASDAQ Symbol");
      table.string("NextShares");
      table.decimal("daily_change");
      table.decimal("abs_daily_change");
  })
    .createTable("fb",(table) => {
      table.integer("index").unsigned();
      table.string("Date");
      table.decimal("Open");
      table.decimal("High");
      table.decimal("Low");
      table.decimal("Close");
      table.decimal("Adj Close");
      table.string("Volume");
      table.string("Symbol");
      table.string("Nasdaq Traded");
      table.string("Security Name");
      table.string("Listing Exchange");
      table.string("Market Category");
      table.string("ETF");
      table.decimal("Round Lot Size");
      table.string("Test Issue");
      table.string("Financial Status");
      table.string("CQS Symbol");
      table.string("NASDAQ Symbol");
      table.string("NextShares");
      table.decimal("daily_change");
      table.decimal("abs_daily_change");
  })
  .createTable("googl",(table) => {
      table.integer("index").unsigned();
      table.string("Date");
      table.decimal("Open");
      table.decimal("High");
      table.decimal("Low");
      table.decimal("Close");
      table.decimal("Adj Close");
      table.string("Volume");
      table.string("Symbol");
      table.string("Nasdaq Traded");
      table.string("Security Name");
      table.string("Listing Exchange");
      table.string("Market Category");
      table.string("ETF");
      table.decimal("Round Lot Size");
      table.string("Test Issue");
      table.string("Financial Status");
      table.string("CQS Symbol");
      table.string("NASDAQ Symbol");
      table.string("NextShares");
      table.decimal("daily_change");
      table.decimal("abs_daily_change");
  })
  .createTable("mdb",(table) => {
      table.integer("index").unsigned();
      table.string("Date");
      table.decimal("Open");
      table.decimal("High");
      table.decimal("Low");
      table.decimal("Close");
      table.decimal("Adj Close");
      table.string("Volume");
      table.string("Symbol");
      table.string("Nasdaq Traded");
      table.string("Security Name");
      table.string("Listing Exchange");
      table.string("Market Category");
      table.string("ETF");
      table.decimal("Round Lot Size");
      table.string("Test Issue");
      table.string("Financial Status");
      table.string("CQS Symbol");
      table.string("NASDAQ Symbol");
      table.string("NextShares");
      table.decimal("daily_change");
      table.decimal("abs_daily_change");
  })
  .createTable("msft",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
  .createTable("net",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
  .createTable("nflx",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
  .createTable("shop",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
  .createTable("su",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
  .createTable("team",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
  .createTable("tsla",(table) => {
    table.integer("index").unsigned();
    table.string("Date");
    table.decimal("Open");
    table.decimal("High");
    table.decimal("Low");
    table.decimal("Close");
    table.decimal("Adj Close");
    table.string("Volume");
    table.string("Symbol");
    table.string("Nasdaq Traded");
    table.string("Security Name");
    table.string("Listing Exchange");
    table.string("Market Category");
    table.string("ETF");
    table.decimal("Round Lot Size");
    table.string("Test Issue");
    table.string("Financial Status");
    table.string("CQS Symbol");
    table.string("NASDAQ Symbol");
    table.string("NextShares");
    table.decimal("daily_change");
    table.decimal("abs_daily_change");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  table.increments("port_id").primary();

};

