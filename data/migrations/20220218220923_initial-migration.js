
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', table => {
      table.increments('project_id')
      table.string('project_name', 128).notNullable()
      table.string('project_description', 128)
      table.boolean('project_completed').defaultTo(0)
    })
    .createTable('resources', table => {
      table.increments('resource_id')
      table.string('resource_name', 128).unique().notNullable()
      table.string('resource_description', 128)
    })
    .createTable('tasks', table => {
      table.increments('task_id')
      table.string('task_description', 128).notNullable()
      table.string('task_notes', 128)
      table.boolean('task_completed').defaultTo(0)
      table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })
    
};

exports.down = function(knex) {
  
};
