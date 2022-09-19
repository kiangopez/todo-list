const t = new Date();
let hours = t.getHours();
let greetings;
if (hours > 5 && hours < 12) {
  greetings = "Good morning";
} else if (hours > 12 && hours < 18) {
  greetings = "Good afternoon";
} else {
  greetings = "Good evening";
}

const greetingHeader = document.querySelector(".greeting-header");

greetingHeader.innerHTML = `${greetings},`;

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || "";

  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  });
  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const td = new Date(todo.createdAt);
    let day = td.getDay();
    let year = td.getFullYear();
    let month = td.getMonth();
    let hour = td.getHours();
    let minutes = td.getMinutes();
    const hoursin12HrFormat = hour >= 13 ? hour % 12 : hour;
    const ampm = hour >= 12 ? "pm" : "am";

    let todoCreateDate;
    console.log();

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const dateSpan = document.createElement("span");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("checkmark");

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    let firstContent = document.createElement("input");
    firstContent.value = todo.content;
    firstContent.setAttribute("readonly", true);

    dateSpan.textContent = `
    ${days[day]} ${months[month]} ${day}, ${year} ${
      hoursin12HrFormat < 10 ? "0" + hoursin12HrFormat : hoursin12HrFormat
    }:${minutes < 10 ? "0" + minutes : minutes} ${ampm}
    `;

    content.appendChild(firstContent);
    content.appendChild(dateSpan);

    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Remove";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }
    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });
    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      dateSpan.classList.toggle("span-active");
      todoItem.classList.toggle("on-edit");
      edit.innerHTML = "Save";
      input.removeAttribute("readonly");
      const end = input.value.length;
      input.setSelectionRange(end, end);
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}

// content.innerHTML = `
// <input type="text" value="${todo.content}" readonly>
// <span class="${spanActive}">
//   ${days[day]} ${months[month]} ${day}, ${year} ${
// hoursin12HrFormat < 10 ? "0" + hoursin12HrFormat : hoursin12HrFormat
// }:${minutes < 10 ? "0" + minutes : minutes} ${ampm}
// </span>
// `;
