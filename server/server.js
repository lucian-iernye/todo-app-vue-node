const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});

mongoose.connect("mongodb://localhost/test-TODOLIST", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let db = mongoose.connection;
db.on("open", () => {
  console.log("Connected to database");
});
db.on("error", (err) => {
  console.log("Error connecting to database");
});
