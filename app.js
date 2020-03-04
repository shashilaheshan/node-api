const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const heroes = require("./routes/heroes");
const home = require("./routes/home");
const users = require("./routes/users");

const authentication = require("./middleware/authenticator");
const emailSender = require("./middleware/email-sender");

const app = express();

await connectDb();

// serves for every route
app.use(cors());
app.use(express.json());
app.use(authentication);
app.use(emailSender);

// custom middlewares
app.use("/api/heroes", heroes);
app.use("/api/users", users);
app.use("/", home);

// If collection is not exists it will create automatically and document too (Hero -> heros happen automatically)
async function connectDb() {
  try {
    mongoose.connect(
      "mongodb+srv://shashila:1995heshan@cluster0-d5sv8.mongodb.net/test",
      { useNewUrlParser: true }
    );
    const conn = mongoose.connection;
    mongoose.connection.once("open", () => {
      console.log("MongoDB Connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error: ", err);
    });
  } catch (error) {
    console.log(error.message);
  }
}

app.listen(process.env.PORT || 5000);
