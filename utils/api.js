//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

// Este código es un conjunto de funciones JavaScript que simulan operaciones CRUD
//(Crear, Leer, Actualizar y Borrar) en una lista de tareas.


import { tasks } from './data';

export async function createTask(taskData) {
  // Simular una llamada a la API para crear una tarea
  // hasta que se desarrolle la solicitud solicitud POST al backend aquí
  const newTask = {
    ...taskData,
    id: Date.now().toString(),
    completed: false,
    createdAt: new Date().toString(), // Mantener la fecha en formato legible
  };
  tasks.push(newTask);
}

export async function getTaskById(taskId) {
  // Simular una llamada a la API para obtener una tarea por su ID
  // hasta que se desarrolle una solicitud GET al backend aquí
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    return { ...task, createdAt: task.createdAt };
  }
  return null;
}

export async function getTasks() {
  // Simular una llamada a la API para obtener todas las tareas
  // hasta que se desarrolle una solicitud GET al backend aquí
  return tasks;
}

export async function updateTask(taskId, updatedTask) {
  // Simular una llamada a la API para actualizar una tarea
  // hasta que se desarrolle una solicitud PUT al backend aquí
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
  }
}

export async function deleteTask(taskId) {
  /// Simular una llamada a la API para eliminar una tarea
  // hasta que desarrolle una solicitud DELETE al backend aquí
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1); // Elimina la tarea del array
  }
}
