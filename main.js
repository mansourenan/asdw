
var data = [];
var Text_Task = document.querySelector(".input");
var completedTasks = [];

// We register the data in Local Storage and display it
if (localStorage.getItem("data") != null) {
    data = JSON.parse(localStorage.getItem("data"));
    completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    DisplayInput();
}

// We add what we wrote in the input to the views, save it in the local history, display it in the table, and delete what we wrote in the input
function addTask() {
    if (Text_Task.value.toString().trim() == "".toString().trim()) {
        alert("Write Task");
    } else {
        data.push(Text_Task.value);
        localStorage.setItem("data", JSON.stringify(data));
        DisplayInput();
        ClearInput();
    }
}

// We display everything in the table
function DisplayInput() {
    var Cartona = "";

    for (var i = 0; i < data.length; i++) {
        var isCompleted = completedTasks.includes(i);
        Cartona = Cartona + `
        <tr>
            <td>
                <ul class="taskList">
                    <li class="Task_li" style="text-decoration: ${isCompleted ? 'line-through' : 'none'}">
                        ${data[i]}
                    </li>
                </ul>
            </td>
            <td>
                <button class="DoneButton" onclick="DoneButton(this, ${i})">${isCompleted ? 'Undo' : 'Done'}</button>
            </td>   
            <td>
                <button class="DeletedButton" onclick="DeletedInputValue(${i})">Delete</button>
            </td>
        </tr>`;
    }

    document.querySelector(".add-element").innerHTML = Cartona;
}

// This clears the input
function ClearInput() {
    Text_Task.value = "";
}

// We make a dellet row from the table
function DeletedInputValue(index) {
    data.splice(index, 1);
    completedTasks = completedTasks.filter(taskIndex => taskIndex != index).map(taskIndex => taskIndex > index ? taskIndex - 1 : taskIndex);
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    DisplayInput();
}

// When we press Done, we change its value to Undo and cross out the completed task. If we press Undo, we will remove the line from the task.
function DoneButton(buttonElement, index) {
    var taskLi = buttonElement.closest("tr").querySelector("li");
    if (buttonElement.innerText === "Done") {
        buttonElement.innerText = "Undo";
        taskLi.style.textDecoration = "line-through";
        if (!completedTasks.includes(index)) {
            completedTasks.push(index);
        }
    }
    else {
        buttonElement.innerText = "Done";
        taskLi.style.textDecoration = "none";
        completedTasks = completedTasks.filter(taskIndex => taskIndex != index);
    }
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function DeleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        data = [];
        completedTasks = [];
        localStorage.removeItem("data");
        localStorage.removeItem("completedTasks");
        DisplayInput();
    }
}



