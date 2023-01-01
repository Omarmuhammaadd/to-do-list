// const fetch = require("node-fetch");
async function get_data() {
  try {
    // get the data from the server and convert it to json by sending a get request to the server
    const response = await fetch("http://localhost:3000/Tasks");
    const datas = await response.json();
    datas.data.tasks.forEach(element => {
      document.getElementById("task").textContent += (element.name + ' ');
    }); // to print the tasks in the console
  } catch (err) {
    console.log(err);
  }
}
get_data();
// 127.0.0.1:3000/Tasks
