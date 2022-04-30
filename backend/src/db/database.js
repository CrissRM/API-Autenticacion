const mongoose = require("mongoose"),
  { Mongoose } = require("../config");

const connectDB = async () => {
  const db = await mongoose.connect(
    `${Mongoose.prot}${Mongoose.host}:${Mongoose.port}/${Mongoose.name}`
  );

  console.log(
    `Conectdo a la base de datos: ${db.connection._connectionString}`
  );
};

module.exports = connectDB;
