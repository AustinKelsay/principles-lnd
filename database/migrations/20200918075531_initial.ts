exports.up = function(knex: any) {
    return (knex.schema.createTable('users', (users: any) => {
        users.increments();
  
        users
          .string('username', 128)
          .notNullable()
          .unique();
      
        users
          .string('password', 128)
          .notNullable();

        users
          .boolean("admin")
          .defaultTo(0)
  
    })
      .createTable('principles', (principles: any) => {
          principles.increments();

          principles
          .integer('user_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('users')
          .onUpdate("CASCADE")
          .onDelete("CASCADE");

          principles
          .string('problem')
          .notNullable()
          .unique()

          principles.string('diagnosis')
          .notNullable()
          
          principles.string('change')
          .notNullable()
          .unique()

          principles
            .integer('votes')
            .defaultTo(0)
      })
      .createTable('nodes', (nodes: any) => {
        nodes
          .string('host')
          .notNullable()
          .unique()

        nodes
          .string('cert')
          .notNullable()
          .unique()

        nodes
          .string('macaroon')
          .notNullable()
          .unique()
        
        nodes
          .string('pubkey')
          .notNullable()
          .unique()
      }))
  };
  
  exports.down = function(knex: any) {
      return( knex.schema
        .dropTableIfExists('nodes')
        .dropTableIfExists("principles")
        .dropTableIfExists("users")
      )
  };