const express = require("express");// to use express
const TaskRouter = require("./TaskRouter"); // to route for tasks
var cors = require("cors"); // to enable every address to log in

const app = express();
// to enable every address to log in
app.use(cors());
// chagne the body of the requset to json
app.use(express.json());
// calling the task router to route for tasks 
app.use("/Tasks", TaskRouter);
// to listen to port 3000
module.exports = app;
