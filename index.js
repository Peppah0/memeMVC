//ตั้งค่า server ในการรันโปรแกรม
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("successfully connected"))
  .catch((err) => console.log(err));

//BodyParsing
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
//Routes
app.use("/", require("./routes/meme"));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server don start for port: " + PORT));
