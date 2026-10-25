import "./style.css";


document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todo-list");
    const todoInput = document.querySelector("#todo-input");
    const todoButton = document.querySelector("#todo-button");

    let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
    todoItems.forEach((todoItem) => renderTodoItems(todoItem));

    todoButton.addEventListener("click", () => {
        const todoText = todoInput.value.trim();
        if (todoText === "") return;

        const newTodo = {
            id: Date.now(),
            text: todoText,
            isCompleted: false
        };

        todoItems.push(newTodo);
        saveTodo();
        renderTodoItems(newTodo);

        todoInput.value = "";
        console.log(todoItems);
    });

    function renderTodoItems(todo) {
        const todoItem = document.createElement("li");
        todoItem.dataset.id = todo.id;
        todoItem.classList.add("flex", "items-center", "mb-4", "justify-between", "border-2", "border-gray-400", "rounded-md", "lg:rounded-xl", "p-2", "lg:p-4")

        todoItem.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" id="todo-item" class="mr-4 w-4 h-4 lg:w-6 lg:h-6 accent-gray-400">
                <label for="todo-item" class="text-gray-800 text-md lg:text-lg">${todo.text}</label>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800" viewBox="0 0 24 24"><title>close
            </title>
            <path fill="currentColor"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/>
            </svg>
        `

        todoList.appendChild(todoItem);
    }

    function saveTodo() {
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
    }
});