const express = require("express");
const mongoose = require("mongoose");
const signupUser = require("./routers/signupUser");
const loginUser = require("./routers/loginUser");

const app = express();
app.use(express.json());

app.use("/signup", signupUser);
app.use("/login", loginUser);

mongoose
  .connect(
    "mongodb+srv://saleemsameer736_db_user:k1TdF4l0OfyTcnMn@db-connection-cluster.wvctwcn.mongodb.net/?appName=db-connection-cluster"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const port = 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
