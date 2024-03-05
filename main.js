document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    var newTask = document.createElement("li");
    newTask.innerHTML = `
        <input type="checkbox" onclick="toggleComplete(this)">
        <span>${taskInput.value}</span>
        <span class="icons">
            <i class="fas fa-edit" onclick="editTask(this)"></i>
            <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
        </span>
    `;

    taskList.insertBefore(newTask, taskList.firstChild);
    saveTasks();
    taskInput.value = "";
}

function deleteTask(element) {
    var taskList = document.getElementById("taskList");
    var task = element.closest("li");
    taskList.removeChild(task);
    saveTasks();
}

function editTask(element) {
    var task = element.closest("li");
    var taskText = task.querySelector("span");
    var newText = prompt("Edit task:", taskText.textContent);
    
    if (newText !== null) {
        taskText.textContent = newText;
        saveTasks();
    }
}

function toggleComplete(checkbox) {
    var task = checkbox.closest("li");
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = [];
    
    taskList.childNodes.forEach(function (task) {
        if (task.nodeName === "LI") {
            var taskText = task.querySelector("span").textContent;
            var isCompleted = task.classList.contains("completed");
            tasks.push({ text: taskText, completed: isCompleted });
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    var storedTasks = localStorage.getItem("tasks");

    if (storedTasks !== null) {
        var tasks = JSON.parse(storedTasks);

        tasks.forEach(function (task) {
            var newTask = document.createElement("li");
            newTask.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(this)">
                <span>${task.text}</span>
                <span class="icons">
                    <i class="fas fa-edit" onclick="editTask(this)"></i>
                    <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
                </span>
            `;

            if (task.completed) {
                newTask.classList.add("completed");
            }

            taskList.appendChild(newTask);
        });
    }
}

// Listen for the Enter key press in the input field
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
