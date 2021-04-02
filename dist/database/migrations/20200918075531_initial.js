exports.up = function (knex) {
    return (knex.schema.createTable('users', (users) => {
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
            .defaultTo(0);
    })
        .createTable('principles', (principles) => {
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
            .unique();
        principles.string('diagnosis')
            .notNullable();
        principles.string('change')
            .notNullable()
            .unique();
        principles
            .integer('votes')
            .defaultTo(0);
    })
        .createTable('nodes', (nodes) => {
        nodes
            .string('host')
            .notNullable()
            .unique();
        nodes
            .string('tls')
            .notNullable()
            .unique();
        nodes
            .string('macaroon')
            .notNullable()
            .unique();
    }));
};
exports.down = function (knex) {
    return (knex.schema
        .dropTableIfExists('nodes')
        .dropTableIfExists("principles")
        .dropTableIfExists("users"));
};
//# sourceMappingURL=20200918075531_initial.js.map