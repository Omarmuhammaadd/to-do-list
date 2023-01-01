const { Console } = require("console");
const Task = require("./TaskModel");

// middlleware to check if the task has a name
exports.checkBody = (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        status: "fail",
        message: "Missing name",
      });
    }
  } catch (err) {
    return err;
  }
  // to move to the next middleware
  next();
};

exports.AddTask = async (req, res) => {
  try {
    // Create a new task from the request body
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    // gets all tasks from database
    const tasks = await Task.find();
    res.status(201).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks: tasks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

/*
JSON response for getAllTasks
{
  status : "success",
  results : number of tasks,
  data : 
  {
    tasks : [   // array of tasks] 
  }
}
*/

// get a task by id
exports.deleteAll= async (req, res) => {
  try {
    // delete all tasks from database
    await Task.deleteMany();
    res.status(204).json({
      status: "success",
      data: null,
    });// 204 means no content and the data is null
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
