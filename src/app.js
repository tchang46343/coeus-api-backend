require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("uuid/v4");
const { CLIENT_ORIGIN } = require("./config");

const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(express.json());
app.use(helmet());
const consumerData = require("../inventory-data.js");
// get the search query
app.get("/inventory", (req, res) => {
  const { search = "" } = req.query;
  // filter the results by the search query

  const results = consumerData.filter(consumer =>
    consumer.Vendor.toLowerCase().includes(search.toLowerCase())
  );

  if (results === []) {
    res
      .status(404)
      .json({ error: "Vendor Invalid, please enter a valid vendor" });
  }

  res.json(results);
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

app.post("/inventory", (req, res, next) => {
  const { vendor, item_name, description, price, availbility } = req.body;

  if (!vendor) {
    return res.status(400).send("Vendor required");
  }
  if (!item_name) {
    return res.status(400).send("Item ID required");
  }

  if (!description) {
    return res.status(400).send("description needed for clear interpretation!");
  }
  if (!price) {
    return res.status(400).send("Everything in life cost money!");
  }
  if (!availbility) {
    return res.status(400).send("Is there inventory in stock?");
  }

  if (vendor.length < 3 || vendor.length > 40) {
    return res.status(400).send("Vendor must be between 3 and 40 characters");
  }

  if (parseFloat(price).isNaN) {
    return res.status(400).send("price must be greater than $0.00");
  }

  const id = uuid();
  const newVendorSetup = {
    id,
    vendor,
    item_name,
    description,
    price,
    availbility
  };
  consumerData.push(newVendorSetup);

  res
    .status(201)
    .location(`http://localhost:8000/inventory/${id}`)
    .json(consumerData);
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

app.delete("/inventory/:inventoryId", (req, res) => {
  const { inventoryId } = req.params;

  const index = inventory.findIndex(invent => invent.id === inventoryId);
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  inventory.splice(index, 1);
  res.status(204).end();
});

app.get("/inventory", (req, res) => {
  res.json(consumerData);
});

module.exports = app;
