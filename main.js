let tasks = [];
loadFromLocalStorage();
PastDateBlock();
timeAutoInput();

function getTaskDetails() {
    event.preventDefault();
    const textTask = document.getElementById("textTask");
    const dateTask = document.getElementById("dateTask");
    const timeTask = document.getElementById("timeTask");
    const task = {
        text: textTask.value,
        date: dateTask.value,
        time: timeTask.value,
    }
    tasks.push(task);
    if (task.text == "" || task.date == "" || task.time == "") {
        textTask.innerHTML = "pink";
        dateTask.innerHTML = "pink";
        timeTask.innerHTML = "pink";
        alert("pleas fill all fields and try agian");
    } else {
        drawTask();
        resetForm();
        textTask.focus();
        PastDateBlock();
        timeAutoInput();
    }

}



function drawTask() {
    const taskContainer = document.getElementById("taskContainer");
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        if (tasks.length - 1 == i) {
            html += `<div class ="lastOne">`
        }
        html += `<div class="taskBox">
            <div  class="btnContainer">
            <div >
            <a class="deleteBtn" ><svg id=${i} onclick="deleteItem(this)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg></a>
            </div>
        </div>
        <div class="taskText">
            ${tasks[i].text}
        </div>
        <div class="taskDateAndTime">
        ${tasks[i].date}
            <br>
            ${tasks[i].time}
        </div>
    </div>`
        if (tasks.length - 1 == i) {
            html += `</div>`
        }
    }
    taskContainer.innerHTML = html;
    saveToLocalStorage();
}

function deleteItem(task) {
    const deleteTask = task.id;
    tasks.splice(deleteTask, 1);
    saveToLocalStorage();
    drawTask();
    PastDateBlock();
    timeAutoInput();
}

function resetForm() {
    const formFrame = document.getElementById("formFrame");
    formFrame.reset();
}


function saveToLocalStorage() {
    const taskSrt = JSON.stringify(tasks);
    localStorage.setItem("bensTasks", taskSrt)
}

function loadFromLocalStorage() {
    const taskSrt = localStorage.getItem("bensTasks");
    if (taskSrt != null && taskSrt.length > 0) {
        tasks = JSON.parse(taskSrt);
    }
    drawTask();

}

function PastDateBlock() {
    const dateInput = document.getElementById("dateTask");
    const dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    const maxDate = year + '-' + month + '-' + day;
    dateInput.setAttribute("min", maxDate);
    dateInput.value = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
}

function timeAutoInput() {
    const timeInput = document.getElementById("timeTask");
    const current = new Date();
    let hours = (current.getHours());
    let minute = current.getMinutes();
    if (hours < 10)
        hours = '0' + hours;
    if (minute < 10)
        minute = '0' + minute;
    const now = hours + ':' + minute;
    timeInput.value = now;
};