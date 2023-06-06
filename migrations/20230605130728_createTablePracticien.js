/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("clients",(table) => {
    table.increments('id')
    table.text('firstName').notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable().unique()
    table.date("birthdate").notNullable()
    table.text("phone").notNullable()
    table.boolean('sexe').notNullable()
    table.text('adress').notNullable()
    table.text('city').notNullable()
    table.text('postalCode').notNullable()
    table.text('encodedVitalNum')
    table.text('encodedPassword')
  })
  

  await knex.schema.createTable("medecins",(table) => {
    table.increments('id')
    table.text('firstName').notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable().unique()
    table.date("birthdate").notNullable()
    table.text("phone").notNullable()
    table.text('adress').notNullable()
    table.text('city').notNullable()
    table.text('postalCode').notNullable()
    table.boolean("sexe").notNullable()
    table.integer('idSpecialisation')
    table.text('encodedPassword')
  })
  await knex.schema.createTable("specialisations",(table) => {
    table.increments('id')
    table.text('label').notNullable()
  })
  await knex.schema.createTable("appointments",(table) => {
    table.increments('id')
    table.text('motif').notNullable()
    table.integer('idMedecin').notNullable()
    table.integer('idClient').notNullable()
    table.dateTime('dateAppointment').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('clients')
  await knex.schema.dropTable('specialisations')
  await knex.schema.dropTable('appointments')
  await knex.schema.dropTable('medecins')
};
