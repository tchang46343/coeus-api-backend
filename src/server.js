const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// const consumerData = require("../inventory-data.js");
// app.get("/inventory", (req, res) => {
//   res.json(consumerData);
// });
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
