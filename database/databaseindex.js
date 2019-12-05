const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "coeus_system"
  }
});

module.exports = knex;
