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
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

