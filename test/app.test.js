//import { chai, supertest, mocha } from "./setup";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const notValid = require("../src/app");

describe(" GET /inventory should list items in database", () => {
  it("GET /inventory responds === with all database array objects ", () => {
    return supertest(app)
      .get("/inventory")
      .expect(200, "Current inventory list");
  });
  it("should return 400 if endpoint is not valid ", () => {
    return supertest(app).get("/htrh");
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
