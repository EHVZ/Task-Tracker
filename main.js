"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promptSync = require("prompt-sync");
var fs = require("fs");
var path = require("path");
var prompt = promptSync();
var FilePath = path.join(__dirname, 'tasks.json');
// Crear archivo si no existe
if (!fs.existsSync(FilePath)) {
    fs.writeFileSync(FilePath, '[]', 'utf-8');
}
var tasks = JSON.parse(fs.readFileSync(FilePath, 'utf-8'));
// Función para guardar cambios
function saveTasks() {
    fs.writeFileSync(FilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}
// ============================
//        FUNCIONES
// ============================
function CreateTask() {
    console.log("\n=== CREATE TASK ===");
    var newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    var taskDescription = prompt('Enter the task description: ');
    var newTask = {
        id: newId,
        description: taskDescription,
        status: 'Todo',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks();
    console.log("\n✅ Task created successfully!");
    console.log("----------------------------");
}
function UpdateTask() {
    console.log("\n=== UPDATE TASK ===");
    if (tasks.length === 0) {
        console.log("\n⚠ No tasks found. Create a task first.\n");
        return;
    }
    var taskId = parseInt(prompt('Enter the task ID: '), 10);
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task) {
        console.log("\n❌ Task not found.\n");
        return;
    }
    var optionTask = parseInt(prompt('\nWhat do you want to update?\n' +
        '1. Update description\n' +
        '2. Update status\n' +
        '3. Delete task\n' +
        '4. Exit\n> '), 10);
    if (optionTask === 1) {
        var newDescription = prompt('Enter the new description: ');
        task.description = newDescription;
        task.updatedAt = new Date();
        saveTasks();
        console.log("\n✅ Description updated!\n");
    }
    else if (optionTask === 2) {
        var statusOption = parseInt(prompt('\nSelect status:\n1. In Progress\n2. Completed\n> '), 10);
        if (statusOption === 1)
            task.status = 'InProgress';
        else if (statusOption === 2)
            task.status = 'Completed';
        else
            console.log("\n⚠ Invalid status option.");
        task.updatedAt = new Date();
        saveTasks();
        console.log("\n✅ Status updated!\n");
    }
    else if (optionTask === 3) {
        tasks = tasks.filter(function (t) { return t.id !== taskId; });
        saveTasks();
        console.log("\n🗑 Task deleted!\n");
    }
    else if (optionTask === 4) {
        console.log("\n↩ Returning to menu...\n");
    }
    else {
        console.log("\n⚠ Invalid option.\n");
    }
}
function callTasks() {
    console.log("\n=== ALL TASKS ===");
    if (tasks.length === 0) {
        console.log("\n⚠ No tasks found.\n");
        return;
    }
    tasks.forEach(function (task) {
        console.log("\n\uD83C\uDD94 ID: ".concat(task.id));
        console.log("\uD83D\uDCC4 Description: ".concat(task.description));
        console.log("\uD83D\uDCCC Status: ".concat(task.status));
        console.log("\uD83D\uDDD3 Created At: ".concat(task.createdAt));
        console.log("\uD83D\uDD04 Updated At: ".concat(task.updatedAt));
        console.log("----------------------------");
    });
}
function SpecificCallTask() {
    console.log("\n=== SEARCH TASK BY STATUS ===");
    var optionSearch = parseInt(prompt('\n1. Show Todo tasks\n' +
        '2. Show Completed tasks\n' +
        '3. Show In Progress tasks\n' +
        '4. Exit\n> '), 10);
    var filtered = [];
    if (optionSearch === 1) {
        filtered = tasks.filter(function (t) { return t.status === 'Todo'; });
    }
    else if (optionSearch === 2) {
        filtered = tasks.filter(function (t) { return t.status === 'Completed'; });
    }
    else if (optionSearch === 3) {
        filtered = tasks.filter(function (t) { return t.status === 'InProgress'; });
    }
    else if (optionSearch === 4) {
        console.log("\n↩ Returning to menu...\n");
        return;
    }
    else {
        console.log("\n⚠ Invalid option.\n");
        return;
    }
    if (filtered.length === 0) {
        console.log("\n⚠ No matching tasks found.\n");
    }
    else {
        filtered.forEach(function (task) {
            console.log("\n\uD83C\uDD94 ID: ".concat(task.id));
            console.log("\uD83D\uDCC4 Description: ".concat(task.description));
            console.log("\uD83D\uDCCC Status: ".concat(task.status));
            console.log("----------------------------");
        });
    }
}
// ============================
//         MAIN MENU
// ============================
function main() {
    while (true) {
        console.log("\n============================");
        console.log("       TASK MANAGER");
        console.log("============================");
        console.log("1. Create Task");
        console.log("2. Update Task");
        console.log("3. View All Tasks");
        console.log("4. Search Task by Status");
        console.log("5. Exit");
        console.log("============================");
        var option = parseInt(prompt("> "), 10);
        if (option === 1)
            CreateTask();
        else if (option === 2)
            UpdateTask();
        else if (option === 3)
            callTasks();
        else if (option === 4)
            SpecificCallTask();
        else if (option === 5) {
            console.log("\n👋 Bye!\n");
            break;
        }
        else {
            console.log("\n⚠ Invalid option.\n");
        }
    }
}
main();
