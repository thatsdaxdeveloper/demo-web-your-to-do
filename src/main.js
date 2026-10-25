import "./style.css";


document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todo-list");
    const todoInput = document.querySelector("#todo-input");
    const todoButton = document.querySelector("#todo-button");
    const remainingTodos = document.querySelector("#remaining-todos");

    let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
    todoItems.forEach((todoItem) => renderTodoItems(todoItem));

    updateTaskCount(todoItems);

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
        updateTaskCount(todoItems);
        todoInput.value = "";
        console.log(todoItems);
    });

    function updateTaskCount(tasks) {
        remainingTodos.textContent = `Your remaining todos: ${todoItems.filter((t) => t.isCompleted === false).length}`;
    }

    function renderTodoItems(todo) {
        const todoItem = document.createElement("li");
        todoItem.dataset.id = todo.id;
        todoItem.classList.add("flex", "items-center", "mb-4", "justify-between", "border-2", "border-gray-400", "rounded-md", "lg:rounded-xl", "p-2", "lg:p-4");

        todoItem.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" id="todo-check-${todo.id}" class="mr-4 w-4 h-4 lg:w-6 lg:h-6 accent-gray-400">
                <label for="todo-check-${todo.id}" class="text-gray-800 text-md lg:text-lg peer-checked:line-through">${todo.text}</label>
            </div>
            <svg id="todo-delete" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800" viewBox="0 0 24 24"><title>close
            </title>
            <path fill="currentColor"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/>
            </svg>
        `;

        const checkbox = todoItem.querySelector("input");
        checkbox.addEventListener("change", () => {
            todo.isCompleted = !todo.isCompleted;
            todoItem.querySelector("input").classList.toggle("peer");
            updateTaskCount(todoItems);
            saveTodo();
        });

        const deleteButton = todoItem.querySelector("#todo-delete");
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            event.target.closest("li").remove();

            todoItems = todoItems.filter((t) => t.id !== todo.id);
            updateTaskCount(todoItems);
            saveTodo();
        });

        if (todo.isCompleted) {
            checkbox.checked = true;
            checkbox.classList.add("peer");
        }

        todoList.appendChild(todoItem);
    }

    function saveTodo() {
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
    }
});


// document.addEventListener("DOMContentLoaded", () => {
//     const todoInput = document.querySelector("#todo-input");
//     const addTaskButton = document.querySelector("#add-task-btn");
//     const todoList = document.querySelector("#todo-list");
//
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//
//     tasks.forEach((task) => renderTasks(task));
//
//     addTaskButton.addEventListener("click", () => {
//         const taskText = todoInput.value.trim();
//         if (taskText === "") return;
//
//         const newTask = {
//             id: Date.now(),
//             text: taskText,
//             isCompleted: false
//         };
//
//         tasks.push(newTask);
//         saveTasks();
//         renderTasks(newTask);
//
//         todoInput.value = "";
//         console.log(tasks);
//     });
//
//     function renderTasks(task) {
//         const li = document.createElement("li");
//
//         li.setAttribute("data-id", task.id);
//         if (li.isConnected) li.classList.add("completed");
//
//         li.innerHTML = `
//             <span>${task.text}</span>
//             <button>Delete</button>
//         `;
//
//         li.addEventListener("click", (event) => {
//             if (event.target.tagName === "BUTTON") return;
//
//             task.isConnected = !task.isConnected;
//             li.classList.toggle("completed");
//             saveTasks();
//         });
//
//         li.querySelector("button").addEventListener("click", (event) => {
//             event.stopPropagation();
//             tasks = tasks.filter((t) => t.id !== task.id);
//             li.remove();
//             saveTasks();
//         });
//
//         todoList.appendChild(li);
//     }
//
//     function saveTasks() {
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//     }
// });