const express = require("express");
const router = express.Router();
const companyModel = require("../models/companyDatamodels");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/createStock", async (req, res) => {
  const Cdata = req.body.results.data;
  let companyName = req.body.companyName;
  for (
    let index = 1;
    index < Cdata.length && Cdata[index][0] != "null";
    index++
  ) {
    let date = Cdata[index][0];
    let open = Cdata[index][1];
    let high = Cdata[index][2];
    let low = Cdata[index][3];
    let close = Cdata[index][4];
    let adjclose = Cdata[index][5];
    let volume = Cdata[index][6];

    const details = {
      companyName: companyName,
      date: date,
      open: open,
      high: high,
      low: low,
      close: close,
      adjclose: adjclose,
      volume: volume,
    };
    const newDetails = new companyModel(details);
    await newDetails.save();
  }
});

// app.get("/getStock", (req, res) => {
//   companyModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

module.exports = router;