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
      table.increments("stock_id").primary()
      table.string('symbol').unique()
      table.string('company_name')
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.index(['symbol'], 'symbol_index')
    })
    .createTable("user_defined_ratios", (table)=> {
      table.increments("ratio_id").primary()
      table.integer("user_id").unsigned().notNullable()
      table.string('ratio_description')
      table.json('calculation_object')
      table.timestamp("created_at").defaultTo(knex.fn.now())
      table
          .foreign("user_id")
          .references("id")
          .inTable("user")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
    })
    .createTable("user_preferences", (table) => {
        table.increments("pref_id").primary();
        table.integer("user_id").unsigned().notNullable()
        table.integer("stock_id").unsigned().notNullable()
        table.string('preference_description').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .foreign("user_id")
          .references("id")
          .inTable("user")
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
        table
          .foreign("stock_id")
          .references("stock_id")
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

