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
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const consumerData = require("../inventory-data.js");

app.get("/inventory", (req, res) => {
  const { search = " " } = req.query;
  if (search == []) {
    res.status(404);
    res.send("Please enter a valid vendor! Try again");
  }

  // if (search != search) {
  //   res.status(404);
  //   res.send("You have entered a invalid vendor! Try again");
  // }

  let results = consumerData.filter(consumer =>
    consumer.Vendor.toLowerCase().includes(search.toLowerCase())
  );

  res.json(results);
});
const vendorSetup = [
  {
    Vendor: "Cool Products",
    Item_ID: "xyz",
    Description: "hanger",
    Price: "$1.50",
    Availbility: "Yes"
  },

  {
    Vendor: "Not Cool Products",
    Item_ID: "BC-001",
    Description: "Boot Bars",
    Price: "$6.50",
    Availbility: "Yes"
  }
];
app.post("/inventory", (req, res) => {
  const { Vendor, Item_ID, Description, Price, Availbility } = req.body;

  if (!Vendor) {
    return res.status(400).send("Vendor required");
  }
  if (!Item_ID) {
    return res.status(400).send("Item ID required");
  }

  if (!Description) {
    return res.status(400).send("Description needed for clear interpretation!");
  }
  if (!Price) {
    return res.status(400).send("Everything in life cost money!");
  }
  if (!Availbility) {
    return res.status(400).send("Is there inventory in stock?");
  }

  if (Vendor.length < 3 || Vendor.length > 40) {
    return res.status(400).send("Vendor must be between 3 and 40 characters");
  }

  if ((Price = 0)) {
    return res.status(400).send("Price must be greater than $0.00");
  }

  const id = uuid();
  const newVendorSetup = {
    id,
    vendor,
    Item_ID,
    Description,
    Price,
    Availbility
  };
  vendorSetup.push(newVendorSetup);
  res.send("All data validated");
});

// app.use(function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === "production") {
//     response = { error: { message: "server error" } };
//   } else {
//     console.error(error);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// });
// module.exports = app;
