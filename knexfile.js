// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'masa_db'
    },
    seeds: {
      directory: './seeds/'
    }
  }
};
