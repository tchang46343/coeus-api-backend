const { PORT, DATABASE_URL } = require("./config");

const knex = require("knex")({
  client: "pg",
  connection: DATABASE_URL

  // {
  //   host: "localhost",
  //   database: "coeus_system"
  // }
});

module.exports = knex;
