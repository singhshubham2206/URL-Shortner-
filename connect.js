
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {     // url is provided by index.js
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};


