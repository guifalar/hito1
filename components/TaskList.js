//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

// Lista de Tareas.

//Se importa React y las funciones useState de React.
import React, { useState } from 'react';
//Se importa el componente Link de la biblioteca Next.js.
import Link from 'next/link';
//Se importa un módulo de estilos para este componente.
import styles from './TaskList.module.css';

//Función TaskList es componente de React que acepta tres propiedades: tasks, onDeleteTask, y onToggleComplete.
//tasks es un arreglo de objetos que representa las tareas.
//onDeleteTask es una función que se invoca cuando se desea eliminar una tarea.
//onToggleComplete es una función que se llama cuando se marca o desmarca una tarea como completa.
function TaskList({ tasks, onDeleteTask, onToggleComplete }) {
  {/*Se utilizan dos estados locales con la función useState de React:
searchTerm: Almacena el término de búsqueda ingresado por el usuario para filtrar las tareas.
showCompleted: Es un valor booleano que controla si se deben mostrar o no las tareas completadas.*/}
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
{/*filteredTasks es un nuevo arreglo que se crea mediante la función filter aplicada a tasks.
Filtra las tareas basándose en dos condiciones:
La tarea debe coincidir con el término de búsqueda (ignorando mayúsculas y minúsculas).
Si showCompleted es true, se mostrarán todas las tareas, incluso las completadas. 
Si es false, solo se mostrarán las tareas no completadas.*/}
  const filteredTasks = tasks.filter(
    (task) =>
      (showCompleted || !task.completed) &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
{/*handleSearchChange se llama cuando el usuario modifica el valor del campo de búsqueda. 
Actualiza el estado searchTerm con el valor del campo de entrada.
handleFilterChange se llama cuando el usuario cambia el estado del checkbox 
para mostrar o no las tareas completadas. Invierte el valor de showCompleted.*/}
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = () => {
    setShowCompleted(!showCompleted);
  };
//El componente renderiza una interfaz de usuario que incluye un campo de búsqueda, 
//un checkbox para filtrar tareas completadas y una lista de tareas.
  return (
    <div className={styles['task-list-container']}>    
      <input
        type="text"
        placeholder="Buscar tarea por nombre"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles['search-input']}
      />
      <label className={styles['filter-label']}>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={handleFilterChange}
        />
        Mostrar tareas completadas
      </label>
      <ul className={styles['task-list']}>
        {filteredTasks.map((task) => (
        <li key={task.id} className={styles['task-item']}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <span className={styles['task-title']}>
            <Link href={`/task/${task.id}`} passHref>
              {task.title}
            </Link>
          </span>
          <span className={styles['task-date']}>{task.date}</span>
          <div className={styles['task-buttons']}>
            <button>
              <Link href={`/task/${task.id}`}>Editar</Link>
            </button>
            <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
          </div>
        </li>
        ))}
      </ul>
    
    </div>
  );

}


export default TaskList;
