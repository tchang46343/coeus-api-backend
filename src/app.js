require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("uuid/v4");
const { CLIENT_ORIGIN } = require("./config");

const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const app = express();
const bodyParser = require("body-parser");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(morgan(morganOption));
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// const consumerData = require("../inventory-data.js");
const db = require("../database/databaseindex");
// get the search query

app.get("/inventory", (req, res) => {
  db.select()
    .from("newvendor")
    .orderBy("id")
    .then(data => {
      res.send(data);
    });
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

app.post("/inventory", (req, res) => {
  db.insert(req.body)
    .returning("*")
    .into("newvendor")
    .then(data => {
      res.send(data);
    });
});

//   const { vendor, item_name, description, price, availbility } = req.body;

//   if (!vendor) {
//     return res.status(400).send("Vendor required");
//   }
//   if (!item_name) {
//     return res.status(400).send("Item ID required");
//   }

//   if (!description) {
//     return res.status(400).send("description needed for clear interpretation!");
//   }
//   if (!price) {
//     return res.status(400).send("Everything in life cost money!");
//   }
//   if (!availbility) {
//     return res.status(400).send("Is there inventory in stock?");
//   }

//   if (vendor.length < 3 || vendor.length > 40) {
//     return res.status(400).send("Vendor must be between 3 and 40 characters");
//   }

//   if (parseFloat(price).isNaN) {
//     return res.status(400).send("price must be greater than $0.00");
//   }

//   const id = uuid();
//   const newVendorSetup = {
//     id,
//     vendor,
//     item_name,
//     description,
//     price,
//     availbility
//   };
//   consumerData.push(newVendorSetup);

//   res
//     .status(201)
//     .location(`http://localhost:8000/inventory/${id}`)
//     .json(consumerData);
// });

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

app.delete("/inventory/:id", (req, res) => {
  db("newvendor")
    .where({ id: req.params.id })
    .del()
    .then(() => {
      res.json({ success: true });
    });
});

app.get("/inventory/:id", (req, res) => {
  db("newvendor")
    .where({ id: req.params.id })
    .select()
    .then(data => {
      res.send(data);
    });
});

//   const { inventoryId } = req.params;

//   const index = inventory.findIndex(invent => invent.id === inventoryId);
//   if (index === -1) {
//     return res.status(404).send("User not found");
//   }
//   inventory.splice(index, 1);
//   res.status(204).end();
// });

module.exports = app;
