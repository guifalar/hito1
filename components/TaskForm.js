//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

//Formulario de Tareas

import React, { useState } from 'react';
import styles from './TaskForm.module.css';

/*
TaskForm es una función de componente que toma dos propiedades como argumentos: 
initialValues y onSubmit.
initialValues se utiliza para establecer los valores iniciales del formulario,
como el título, descripción, estado de completado y fecha de creación.
onSubmit es una función que se llamará cuando el formulario se envíe con éxito.
*/
function TaskForm({ initialValues, onSubmit }) {

  /*
  El componente utiliza el hook useState para gestionar cuatro estados diferentes:
  title, description, completed, y createdAt. 
  Cada uno de estos estados representa un valor en el formulario que puede cambiar 
  a medida que el usuario interactúa con él.
  */
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [completed, setCompleted] = useState(initialValues?.completed || false);
  const initialCreatedAt = initialValues?.createdAt || new Date().toISOString();
  const [createdAt, setCreatedAt] = useState(initialCreatedAt);
  
  /*Esta función se llama cuando el formulario se envía.
   Previene el comportamiento predeterminado de un formulario (recargar la página)
   y crea un objeto taskData con los valores actuales de title, description, completed, y createdAt.
   Luego, llama a la función onSubmit con este objeto como argumento.*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      completed,
      createdAt: createdAt, // Use the selected createdAt value
    };
    onSubmit(taskData);
  };
  /*Función formatDate:

Esta función toma una fecha en formato ISO (como "2023-09-01T12:00:00.000Z") y la convierte en
un formato de fecha más legible, por ejemplo, "01/09/2023". Se utiliza para mostrar la fecha 
de creación en un formato amigable en el formulario.*/
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  //Esta función se llama cuando el usuario cambia el valor del campo de fecha de creación. 
  //Actualiza el estado createdAt con el nuevo valor.
  const handleCreatedAtChange = (e) => {
    const inputDate = e.target.value;
    setCreatedAt(inputDate);
  };
  //Renderiza el formulario
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>

      <div className={styles.labelContainer}>
        <label>
          Titulo:
          <input className={styles.inputField} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
      <div className={styles.labelContainer}>
        <label>
          Descripcion:
          <input className={styles.inputField} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>
      <div className={styles.labelContainer}>
        <label>
          Completado:
          <input
            className={styles.inputField}
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputGroupLabel}>
          Fecha de Creación:
        </label>
        <input
          className={styles.dateText}
          type="text"
          value={formatDate(createdAt)}
          readOnly
        />
      </div>
      <button className={styles.submitButton} type="submit">Confirmar</button>
    </form>
  );
}

export default TaskForm;
