"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var FilePath = path.join(__dirname, 'tasks.json');
if (!fs.existsSync(FilePath)) {
    fs.writeFileSync(FilePath, '[]', 'utf-8');
}
var tasks = JSON.parse(fs.readFileSync(FilePath, 'utf-8'));
function saveTasks() {
    fs.writeFileSync(FilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}
// === FUNCIONES ===
function CreateTask(description) {
    var newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    var newTask = {
        id: newId,
        description: description,
        status: 'Todo',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks();
    console.log("\n✅ Task created successfully!");
}
function UpdateTask(id, newDescription) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (!task) {
        console.log("\n❌ Task not found.\n");
        return;
    }
    task.description = newDescription;
    task.updatedAt = new Date();
    saveTasks();
    console.log("\n✅ Description updated!\n");
}
function DeleteTask(id) {
    var initialLength = tasks.length;
    tasks = tasks.filter(function (t) { return t.id !== id; });
    if (tasks.length < initialLength) {
        saveTasks();
        console.log("\n🗑 Task deleted!\n");
    }
    else {
        console.log("\n❌ Task not found.\n");
    }
}
function MarkTask(id, status) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (!task) {
        console.log("\n❌ Task not found.\n");
        return;
    }
    task.status = status;
    task.updatedAt = new Date();
    saveTasks();
    console.log("\n\u2705 Task marked as ".concat(status, "!\n"));
}
function ListTasks(status) {
    var filtered = status ? tasks.filter(function (t) { return t.status === status; }) : tasks;
    if (filtered.length === 0) {
        console.log("\n⚠ No tasks found.\n");
        return;
    }
    filtered.forEach(function (task) {
        console.log("\n\uD83C\uDD94 ID: ".concat(task.id));
        console.log("\uD83D\uDCC4 Description: ".concat(task.description));
        console.log("\uD83D\uDCCC Status: ".concat(task.status));
        console.log("\uD83D\uDDD3 Created At: ".concat(task.createdAt));
        console.log("\uD83D\uDD04 Updated At: ".concat(task.updatedAt));
        console.log("----------------------------");
    });
}
// === CLI PRINCIPAL ===
function main() {
    var args = process.argv.slice(2);
    var command = args[0];
    var param1 = args[1];
    var param2 = args.slice(2).join(' ');
    switch (command) {
        case 'add':
            if (!param1) {
                console.log("❌ Debes ingresar una descripción.");
                return;
            }
            CreateTask(__spreadArray([param1], args.slice(2), true).join(' '));
            break;
        case 'update':
            if (!param1 || !param2) {
                console.log("❌ Uso: update <id> <nueva descripción>");
                return;
            }
            UpdateTask(parseInt(param1), param2);
            break;
        case 'delete':
            if (!param1) {
                console.log("❌ Uso: delete <id>");
                return;
            }
            DeleteTask(parseInt(param1));
            break;
        case 'mark-in-progress':
            if (!param1) {
                console.log("❌ Uso: mark-in-progress <id>");
                return;
            }
            MarkTask(parseInt(param1), 'InProgress');
            break;
        case 'mark-done':
            if (!param1) {
                console.log("❌ Uso: mark-done <id>");
                return;
            }
            MarkTask(parseInt(param1), 'Completed');
            break;
        case 'list':
            if (!param1) {
                ListTasks();
                return;
            }
            if (param1 === 'todo') {
                ListTasks('Todo');
                return;
            }
            if (param1 === 'done') {
                ListTasks('Completed');
                return;
            }
            if (param1 === 'in-progress') {
                ListTasks('InProgress');
                return;
            }
            console.log("⚠ Estado no válido. Usa: todo, done o in-progress.");
            break;
        default:
            console.log("\nComandos disponibles:\n  add <descripcion>             \u2192 Crear tarea\n  update <id> <descripcion>     \u2192 Actualizar descripci\u00F3n\n  delete <id>                   \u2192 Eliminar tarea\n  mark-in-progress <id>         \u2192 Marcar tarea en progreso\n  mark-done <id>                \u2192 Marcar tarea como completada\n  list [todo|done|in-progress]  \u2192 Listar tareas\n");
    }
}
main();
