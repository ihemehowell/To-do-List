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

function saveTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = [];
    
    taskList.childNodes.forEach(function (task) {
        if (task.nodeName === "LI") {
            tasks.push(task.querySelector("span").textContent);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    var storedTasks = localStorage.getItem("tasks");

    if (storedTasks !== null) {
        var tasks = JSON.parse(storedTasks);

        tasks.forEach(function (taskText) {
            var newTask = document.createElement("li");
            newTask.innerHTML = `
                <span>${taskText}</span>
                <span class="icons">
                    <i class="fas fa-edit" onclick="editTask(this)"></i>
                    <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
                </span>
            `;

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
