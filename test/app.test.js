const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const notValid = require("../src/app");

describe(" GET /inventory should list items in database", () => {
  it(" GET/inventory is sucessful, you are clear for this endpoint ", () => {
    return supertest(app)
      .get("/inventory")
      .expect(200)
      .send("All Clear");
  });
});

describe("POST /inventory", () => {
  it("creates a new Vendor, responding with 201 Status", () => {
    return supertest(app)
      .post("/inventory")
      .send({
        Vendor: "Test Vendor",
        Item_ID: "Gt413",
        Description: "Shoes Shelf",
        Price: "12.25",
        Availbility: "Yes"
      })
      .expect(201);
  });
});

describe("DELETE /inventory/:inventory_id", () => {
  it("responds with 204 and removes the article", () => {
    const testInventory = "./inventory-data.js";
    const idToRemove = 2;
    const expectedInventory = testInventory.filter(
      inventory => inventory.id !== idToRemove
    );
    return supertest(app)
      .delete(`/articles/${idToRemove}`)
      .expect(204)
      .then(res =>
        supertest(app)
          .get(`/inventory`)
          .expect(expectedInventory)
      );
  });
});
