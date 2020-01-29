require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("uuid/v4");
const { CLIENT_ORIGIN, REACT_APP_BASE_URL } = require("./config");

const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const app = express();
const bodyParser = require("body-parser");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

var corsOptions = {
  origin: REACT_APP_BASE_URL
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
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

app.post("/inventory", (req, res) => {
  const { vendor, item_name, description, price, availbility } = req.body;
  const newvendor = { vendor, item_name, description, price, availbility };
  for (const [key, value] of Object.entries(newvendor)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      });
    }
  }
  db.insert(req.body)
    .returning("*")
    .into("newvendor")
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

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
