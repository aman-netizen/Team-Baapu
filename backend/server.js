const express = require('express');
const app = express();
require('dotenv').config();
const db = require("./config/db");
app.use(express.json());
const userRoute = require('./routes/userRoutes');
const companyRoute = require("./routes/companyRoute");
const uploadCSVRoute = require('./routes/uploadCSVRoute')
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/companyData", companyRoute);
// app.use("/api/csv", uploadCSVRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`backend is running fine on port ${port}`);
});
