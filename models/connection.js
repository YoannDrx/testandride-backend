const mongoose = require("mongoose");
const databaseName = 'TestAndRide';
const connectionString = `${process.env.CONNECTION_STRING}${databaseName}`;
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log(`Database ${databaseName} connected`))
  .catch((error) => console.error(error));
