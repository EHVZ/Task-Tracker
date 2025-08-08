import * as promptSync from 'prompt-sync';

const prompt = promptSync();

interface Task {
  id: number;
  title: string;
  description: string;
  inProgress: boolean;
  completed: boolean;
}

let tasks: Task[] = [];

function CreateTask() {


  let taskId = 0;

  let taskTitle = prompt("Enter the task title: ");
  let taskDescription = prompt("Enter the task description: ");


  let task = {
    id: taskId++,
    title: taskTitle,
    description: taskDescription,
    inProgress: true,
    completed: false,
  };

  tasks.push(task);
}

function UpdateTask(tasks: Task[]) {
  if (tasks.length === 0) {
    console.log("No tasks found/Create a task first");
    return;
  }
  let taskId = prompt("Enter the task id: ");
  tasks.forEach(task => {
    if (task.id == taskId  ) {
      let optionTask = prompt(
        "Enter the task option: \n 1. Update description\n 2. Update status\n 3. Delete task\n 4. Exit\n "
      );
      if (optionTask == 1) {
        let taskDescription = prompt("Enter the new task description: ");
        task.description = taskDescription;
      } else if (optionTask == 2) {
        let status = prompt("Enter the task status: \n 1. In Progress\n 2. Completed\n ");
        if (status == 1) {
          task.inProgress = true;
          task.completed = false;
        } else if (status == 2) {
          task.completed = true;
          task.inProgress = false;
        } else {
          alert("Invalid option");
        }
      } else if (optionTask == 3) {
        tasks.splice(task.id, 1);
      } else if (optionTask == 4) {
        console.log("the task is"+ task)
        console.log("Exiting...");
        return;
      } else {
        alert("Invalid option")
      }
    }
  });
}
function callTasks(tasks: Task[]) {
  if (tasks.length === 0) {
    console.log("No tasks found");
    return;
  }
  console.log("Tasks:");
  tasks.forEach(task => {
    console.log("Task ID:", task.id);
    console.log("Task Title:", task.title);
    console.log("Task Description:", task.description);
    console.log("Task Status:", task.inProgress ? "In Progress" : "Completed");
    console.log("------------------------");
  });
  console.log("Exiting...");
  return;       
}




