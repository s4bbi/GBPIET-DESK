const mongoose = require("mongoose");
const { ATLAS_URL } = require("./serverConfig");
async function connectToDB() {
  try {
    await mongoose.connect(ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, // 👈 This forces IPv4
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("unable to connect to Db");
    console.log(err);
    throw error;
  }
}

module.exports = connectToDB;
