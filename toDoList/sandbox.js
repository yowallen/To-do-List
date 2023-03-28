const addForm = document.querySelector(".add");
const todoList = document.querySelector(".todos");
const search = document.querySelector(".search input");
const landPage = document.querySelector(".land-page");
const mainPage = document.querySelector(".main-page");
const startBtn = document.querySelector(".start-btn");
const nameInput = document.getElementById("name-input");
const userName = document.getElementById("user-name");
const logout = document.querySelector(".exit");
const x = document.getElementById("snackbar");

// Setting up local storage whenever user refresh it will not log back into the landpage
if (localStorage.getItem("nameInput")) {
  nameInput.value = localStorage.getItem("nameInput");
  landPage.classList.add("d-none");
  mainPage.classList.remove("d-none");
  userName.innerHTML = nameInput.value.trim();
}

// Event listener to proceed to the main page when user inputted a name
startBtn.addEventListener("click", () => {
  if (nameInput.value !== "") {
    landPage.classList.add("d-none");
    mainPage.classList.remove("d-none");
    userName.innerHTML = nameInput.value.trim();
  } else {
    nameInput.focus();
    x.classList.add("show");
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  localStorage.setItem("nameInput", nameInput.value);
});

//adding items in the todo list
const generateTemplate = (todo) => {
  const addHtml = `
        <li class="list-group-item clicked d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
  todoList.innerHTML += addHtml;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// Event listener when the task is completed
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("clicked")) {
    e.target.classList.add("completed");
  }
});

//deleting items in the todo list
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

//apply searching items in the todo list
const filterItems = (word) => {
  Array.from(todoList.children)
    .filter((list) => !list.textContent.toLowerCase().includes(word))
    .forEach((list) => list.classList.add("filtered"));

  Array.from(todoList.children)
    .filter((list) => list.textContent.toLowerCase().includes(word))
    .forEach((list) => list.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const words = search.value.trim().toLowerCase();
  filterItems(words);
});

// Event Listener to revert back to the landpage
logout.addEventListener("click", () => {
  landPage.classList.remove("d-none");
  mainPage.classList.add("d-none");
  localStorage.removeItem("nameInput");
  nameInput.value = "";
});
