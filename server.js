const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app');


// configure file for projecct 
dotenv.config({ path: "./config.env" });

// Take the database from the config.env file and replace password withe the password from the config.env file
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Connect to the database and log the result we use then because connect returns a promise
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"))
  .catch(() => console.log("NOT Successful"));

// Start the server
app.listen(3000, () => console.log("Server Up and running"));