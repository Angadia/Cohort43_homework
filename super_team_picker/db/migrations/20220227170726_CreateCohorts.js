/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cohorts", (cohorts) => {
    cohorts.bigIncrements("id");
    cohorts.string("name");
    cohorts.string("logo_url");
    cohorts.text("members");
    cohorts.timestamp("created_at").defaultTo(knex.fn.now());
    cohorts.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cohorts");
};
