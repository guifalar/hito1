//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

//Esta es la pagina de comienzo luego del logueo

//Se importa el componente Link de la biblioteca next/link. Este componente se utiliza para 
//crear enlaces entre páginas en una aplicación Next.js. 
import Link from 'next/link';
//Se importa la función useState y useEffect de la biblioteca react. 
//para gestionar el estado y realizar efectos secundarios en componentes funcionales.
import { useState, useEffect } from 'react';
//Se importa el componente TaskList desde un archivo TaskList.js 
import TaskList from '../components/TaskList';
//Se importan las funciones getTasks, updateTask, y deleteTask desde un archivo api.js
import { getTasks, updateTask, deleteTask } from '../utils/api';
import Header from '../components/Header'; // Importamos componente
import Footer from '../components/Footer'; // Importamos componente

//Esta es la función principal del componente que representa la página de inicio de la aplicación.
//Se define un estado tasks utilizando el hook useState, que inicialmente se establece como un array
//vacío. Este estado se utiliza para almacenar la lista de tareas.
//Se utiliza el hook useEffect para realizar una solicitud de datos de tareas cuando el componente
// se monta (cuando el array de dependencias está vacío []). La función fetchTasks se ejecuta 
//para obtener datos de tareas utilizando la función getTasks y luego actualiza el estado tasks 
//con los datos recuperados.
function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const taskData = await getTasks();
      setTasks(taskData);
    }

    fetchTasks();
  }, []);
  {/* la función handleToggleCompletese utiliza para cambiar el estado de una tarea de completa 
  a incompleta o viceversa cuando se hace clic en una tarea.
  Primero, se crea una nueva matriz de tareas updatedTasks utilizando map para actualizar 
  el estado local de las tareas. La tarea correspondiente se actualiza con su propiedad 
  completed invertida.
  Luego, se actualiza el estado tasks con la nueva matriz updatedTasks.
  Se intenta actualizar la tarea en el servidor utilizando la función updateTask, 
  pasando el taskId y el nuevo estado completed de la tarea. Cualquier error se maneja y 
  se muestra en la consola.*/}
  const handleToggleComplete = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    try {
      await updateTask(taskId, { completed: !tasks.find((task) => task.id === taskId).completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  {/*Esta función se utiliza para eliminar una tarea cuando se hace clic en el botón de eliminar.*/}
  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      {/* Se llama al header creado para la aplicacion*/}
      <Header />
        <h1>Lista de Tareas</h1>
        <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDeleteTask={handleDeleteTask} />
        {/* Se crea un enlace que lleva a la página de creación de nuevas tareas (/task/new) utilizando el componente Link de Next.js. */}
        <Link href="/task/new">Crea una nueva Tarea</Link>
      {/* Se llama al footer creado para la aplicacion*/}
      <Footer />
    </div>
  );
}

export default HomePage;
