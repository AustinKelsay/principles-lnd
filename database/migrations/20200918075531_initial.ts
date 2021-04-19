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
        
        users
          .string('host')
          .unique()
        
        users
          .string('cert')
          .unique()

        users
          .string('macaroon')
          .unique()

        users
          .string('pubkey')
          .unique()
        
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
          .string('user')
          .notNullable()
          .references('username')
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
    )
  };
  
  exports.down = function(knex: any) {
      return( knex.schema
        .dropTableIfExists("principles")
        .dropTableIfExists("users")
      )
  };