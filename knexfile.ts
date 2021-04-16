// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/principles.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/principles-test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    }
  },

  production: {
    client: 'pg',
    connection: 'cmaceqogvrahhe:793c3aa7c06fb2b1867046d252933e821d1debc16402d6e93c546c38c99e2836@ec2-107-22-245-82.compute-1.amazonaws.com:5432/d9giq1lvodrhd0',

    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
