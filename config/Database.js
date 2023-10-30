const mongoose = require("mongoose");
const DB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Database connected to ${connect.connections[0].name}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = DB;
