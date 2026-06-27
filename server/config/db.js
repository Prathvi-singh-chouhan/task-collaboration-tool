const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGO_URL);

// for constant checking either mongoDb is connected not
mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDb Connected");
});

module.exports = {
  connection,
};
