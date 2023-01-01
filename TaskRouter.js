const express = require("express");
const TaskController = require("./TaskController");// to use the TaskController

const router = express.Router();// to use the router

// to route for the tasks
router
  .route("/")
  .get(TaskController.getAllTasks)
  .post(TaskController.checkBody, TaskController.AddTask)
  .delete(TaskController.deleteAll);

  // to route for the tasks by id
module.exports = router;
