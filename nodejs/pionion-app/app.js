const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const openRoute = require("./routes/open");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect()
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));
app.use("/api", openRoute);

const port = process.env.PORT;
app.listen(port, () => console.log( `http://${port} is running` ) );