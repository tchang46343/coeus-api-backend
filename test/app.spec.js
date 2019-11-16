import { chai, supertest, mocha } from "../test/setup";
const app = require("../src/app");
const notValid = require("../src/app");

describe(" GET /inventory should list all items in database", () => {
  it('GET /inventory responds with 200 containing "JSON formatting of data base item"', () => {
    return supertest(app)
      .get("/inventory")
      .expect(200, "Current inventory list");
  });
  it("should return an error message saying search term not valid", () => {
    const a = madix;
    const b = greuguhg;
    const expectedAnswer = false;

    const actualAnswer = notValid(a, b);

    expect(expectedAnswer).to.equal(true, "2 === 3");
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
