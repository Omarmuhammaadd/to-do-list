const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const dark = document.querySelector(".dark");
const body = document.querySelector(".body");
const h1 = document.querySelector(".h1");
const small = document.querySelector(".small");
// const server = require('./server.js');

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addtodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addtodo();
});

function addtodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;
    // to add completed
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updatels();
    });

    // add Edit
    todoEl.addEventListener("dblclick", (e) => {
      e.preventDefault();
      if (input.value !== "") {
        todoEl.innerText = input.value;
        input.value = "";
        updatels();
      }
    });

    // remove todo
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updatels();
    });

    todosUL.appendChild(todoEl);
    input.value = "";
    // remove completed task after 100s
    setInterval(() => {
      if (todoEl.classList.contains("completed")) {
        todoEl.remove();
        updatels();
      }
    }, 100000);

    updatels();
  }
}

function updatels() {
  todoEl = document.querySelectorAll("li");

  // sending a delete requset to api to delete all 
  fetch("http://localhost:3000/Tasks", {
    // Adding method type
    method: "DELETE",
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => console.log(json))
    .catch((err) => console.log(err));

  const todos = [];

  todoEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
    // console.log(datas);
    // sending a post requset to api to add current task list 
    fetch("http://localhost:3000/Tasks", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        name: todoEl.innerText,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  // console.log(localStorage);
}

//Dark mode
dark.addEventListener("click", () => {
  body.classList.toggle("on");
  h1.classList.toggle("on");
  small.classList.toggle("on");
});
