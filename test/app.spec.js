const app = require("../src/app");

describe(" GET /inventory should list all items in database", () => {
  it('GET /inventory responds with 200 containing "JSON formatting of data base item"', () => {
    return supertest(app)
      .get("/inventory")
      .expect(200, "Current inventory list");
  });
});

describe(" POST /POST create a new vendor profile", () => {
  it('POST /inventory responds with 200 containing "JSON formatting of data base item"', () => {
    return supertest(app)
      .POST("/inventory")
      .expect(200, "POSTED one new vendor to the database");
  });
});

//DELETE TEST
