/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  knex.schema.alterTable("medecins", (table) => {
    table.foreign('idSpecialisation').references('id').inTable('specialisations')
  })

  knex.schema.alterTable("appointments",(table) => {
    table.foreign('idMedecin').references('id').inTable('medecins')
    table.foreign('idClient').references('id').inTable('clients')
    table.foreign('idRoom').references('id').inTable('rooms')
  })

  knex.schema.alterTable("rooms",(table) => {
    table.foreign('idBuilding').references('id').inTable('buildings')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  knex.schema.alterTable("medecins", (table) => {
    table.dropForeign('idSpecialisation')
  })

  knex.schema.alterTable("appointments",(table) => {
    table.dropForeign('idMedecin')
    table.dropForeign('idClient')
    table.dropForeign('idRoom')
  })

  knex.schema.alterTable("rooms",(table) => {
    table.dropForeign('idBuilding')
  })
};
