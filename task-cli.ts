import * as fs from 'fs';
import * as path from 'path';

interface Task {
  id: number;
  description: string;
  status: 'Todo' | 'InProgress' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

const FilePath = path.join(__dirname, 'tasks.json');

if (!fs.existsSync(FilePath)) {
  fs.writeFileSync(FilePath, '[]', 'utf-8');
}

let tasks: Task[] = JSON.parse(fs.readFileSync(FilePath, 'utf-8'));

function saveTasks() {
  fs.writeFileSync(FilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

// === FUNCIONES ===
function CreateTask(description: string) {
  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask: Task = {
    id: newId,
    description,
    status: 'Todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();
  console.log("\n✅ Task created successfully!");
}

function UpdateTask(id: number, newDescription: string) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    console.log("\n❌ Task not found.\n");
    return;
  }
  task.description = newDescription;
  task.updatedAt = new Date();
  saveTasks();
  console.log("\n✅ Description updated!\n");
}

function DeleteTask(id: number) {
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length < initialLength) {
    saveTasks();
    console.log("\n🗑 Task deleted!\n");
  } else {
    console.log("\n❌ Task not found.\n");
  }
}

function MarkTask(id: number, status: 'InProgress' | 'Completed') {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    console.log("\n❌ Task not found.\n");
    return;
  }
  task.status = status;
  task.updatedAt = new Date();
  saveTasks();
  console.log(`\n✅ Task marked as ${status}!\n`);
}

function ListTasks(status?: 'Todo' | 'InProgress' | 'Completed') {
  const filtered = status ? tasks.filter(t => t.status === status) : tasks;
  if (filtered.length === 0) {
    console.log("\n⚠ No tasks found.\n");
    return;
  }
  filtered.forEach((task) => {
    console.log(`\n🆔 ID: ${task.id}`);
    console.log(`📄 Description: ${task.description}`);
    console.log(`📌 Status: ${task.status}`);
    console.log(`🗓 Created At: ${task.createdAt}`);
    console.log(`🔄 Updated At: ${task.updatedAt}`);
    console.log("----------------------------");
  });
}

// === CLI PRINCIPAL ===
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const param1 = args[1];
  const param2 = args.slice(2).join(' ');

  switch (command) {
    case 'add':
      if (!param1) { console.log("❌ Debes ingresar una descripción."); return; }
      CreateTask([param1, ...args.slice(2)].join(' '));
      break;

    case 'update':
      if (!param1 || !param2) { console.log("❌ Uso: update <id> <nueva descripción>"); return; }
      UpdateTask(parseInt(param1), param2);
      break;

    case 'delete':
      if (!param1) { console.log("❌ Uso: delete <id>"); return; }
      DeleteTask(parseInt(param1));
      break;

    case 'mark-in-progress':
      if (!param1) { console.log("❌ Uso: mark-in-progress <id>"); return; }
      MarkTask(parseInt(param1), 'InProgress');
      break;

    case 'mark-done':
      if (!param1) { console.log("❌ Uso: mark-done <id>"); return; }
      MarkTask(parseInt(param1), 'Completed');
      break;

    case 'list':
      if (!param1) { ListTasks(); return; }
      if (param1 === 'todo') { ListTasks('Todo'); return; }
      if (param1 === 'done') { ListTasks('Completed'); return; }
      if (param1 === 'in-progress') { ListTasks('InProgress'); return; }
      console.log("⚠ Estado no válido. Usa: todo, done o in-progress.");
      break;

    default:
      console.log(`
Comandos disponibles:
  add <descripcion>             → Crear tarea
  update <id> <descripcion>     → Actualizar descripción
  delete <id>                   → Eliminar tarea
  mark-in-progress <id>         → Marcar tarea en progreso
  mark-done <id>                → Marcar tarea como completada
  list [todo|done|in-progress]  → Listar tareas
`);
  }
}

main();
