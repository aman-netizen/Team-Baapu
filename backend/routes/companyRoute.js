const express = require("express");
const router = express.Router();
const Company = require("../models/companyDatamodels");

router.post("/:companyName", async (req, res) => {
  try {
    let companyName = req.body.companyName;
    companyName = companyName.substring(1);
    const company = await Company.find({ companyName: companyName });
    if (company) {
      res.status(200).send({
        message: "Company data featched successfully",
        success: true,
        data: company,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No company exist of this name",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error in finding company", success: true });
  }
});


module.exports = router;
