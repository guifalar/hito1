//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

//página de edición de tareas

//Se realizan las importaciones necesarias
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import TaskForm from '../../components/TaskForm';
import { getTaskById, updateTask } from '../../utils/api';

//Esta es una función de componente React llamada EditTaskPage.
function EditTaskPage() {
/*se utiliza useRouter para obtener el objeto router y 
extraer el valor del parámetro taskId de la consulta actual de la URL. 
Esto permite que la página sepa qué tarea debe editar.*/
  const router = useRouter();
  const { taskId } = router.query;
/*
Se utiliza el hook useState para inicializar un estado local llamado task 
con un valor inicial de null. Este estado se utilizará para almacenar 
la información de la tarea que se va a editar.
*/
  const [task, setTask] = useState(null);
/*Se utiliza el hook useEffect para realizar una solicitud asíncrona para obtener 
los detalles de la tarea utilizando la función getTaskById cuando el valor de taskId cambia.
 Cuando se obtiene la tarea, se actualiza el estado task con los datos de la tarea.*/
  useEffect(() => {
    async function fetchTask() {
      const taskData = await getTaskById(taskId);
      setTask(taskData);
    }

    fetchTask();
  }, [taskId]);
 /*Se define la función handleUpdateTask, que se utilizará para enviar una solicitud para 
actualizar la tarea utilizando la función updateTask. 
Si la actualización es exitosa, se redirige al usuario a la página '/start'. 
Si ocurre un error, se muestra un mensaje de error en la consola.*/
  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(taskId, updatedTask);
      router.push('/start');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  //ser renderiza
  return (
    <div>
      <h1>Editar</h1>
      {task && <TaskForm initialValues={task} onSubmit={handleUpdateTask} />}
    </div>
  );
}

export default EditTaskPage;
