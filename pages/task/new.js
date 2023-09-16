//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

//creación de una nueva tarea

//Realizo las importaciones necesarias

import { useRouter } from 'next/router';
import TaskForm from '../../components/TaskForm';
import { createTask } from '../../utils/api';

//Este componente representa la página donde los usuarios pueden crear nuevas tareas.
function NewTaskPage() {
  //Utiliza el hook useRouter para obtener una instancia del objeto router. 
  //Este objeto se utiliza más adelante para redirigir al usuario a otra página 
  //después de crear la tarea.
  const router = useRouter();
  // Define una función asincrónica que se ejecutará cuando el usuario envíe 
  //el formulario de creación de la tarea. 
  const handleCreateTask = async (taskData) => {
      //En el bloque try, se llama a la función createTask con los datos de la tarea. 
      //Esta llamada  envía una solicitud al servidor para crear la tarea en la base de datos. 
      // Después de crear la tarea con éxito, se redirige al usuario a la página '/start' 
      //utilizando router.push('/start').
    try {
      await createTask(taskData);
      router.push('/start')

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  //Renderizado del componente:
  return (
    <div>
      <h1>Nueva Tarea</h1>
      <TaskForm initialValues={{}} onSubmit={handleCreateTask} />
    </div>
  );
}

export default NewTaskPage;
