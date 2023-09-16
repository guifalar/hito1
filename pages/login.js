//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

// página de login.

//Se importa React y la función useState de React para crear componentes de React 
//y gestionar el estado del componente.
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './RegisterPage.module.css'; // Importamos los estilos CSS
import Header from '../components/Header'; // Importamos componente
import Footer from '../components/Footer'; // Importamos componente

//Define un componente funcional llamado LoginPage.
function LoginPage() {
  //Usa el hook useState para crear varios estados en el componente
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
//Esta función se llama cuando se hace clic en el botón "Iniciar sesión".
//Recupera un objeto de usuario almacenado en el almacenamiento local (localStorage)
// y lo analiza como JSON.
//Compara el nombre de usuario y la contraseña ingresados con los almacenados en storedUser.
//Si coinciden, establece la sesión como iniciada en sessionStorage, muestra un mensaje 
//de éxito y redirige al usuario a la página '/start' después de 2 segundos.
//Si no coinciden, muestra un mensaje de error.
  function handleLogin() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      sessionStorage.setItem('loggedIn', 'true');
      setSuccessMessage(`¡Bienvenido de nuevo, ${username}! Sesión iniciada. Vamos a la lista de Tareas.`);
      setUsername('');
      setPassword('');
      setError('');
      setTimeout(function() {
        router.push('/start');
      }, 2000);
    } else {
      setError('Usuario o contraseña incorrectos');
      setSuccessMessage('');
    }
  }
//Se renderiza el componente, utilizando las clases CSS definidas en styles 
//para aplicar estilos.
  return (
    <div className={styles.container}>
      {/* Se llama al header creado para la aplicacion*/}
      <Header />
        <h1 className={styles.title}>Iniciar Sesión</h1>
        {/* Se usa el atributo onChange  al final de cada ingreso que especifica 
        una función que se ejecutará cada vez que el contenido del campo cambie*/}
        <input
          className={styles.input}
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
         {/* Se ejecuta la funcion handleLogin cuando se hace click en el boton*/}
        <button className={styles.button} onClick={handleLogin}>
          Iniciar sesión
        </button>
        <p className={styles.error}>{error}</p>
        <p className={styles.success}>{successMessage}</p>
      {/* Se llama al footer creado para la aplicacion*/}
      <Footer />
    </div>
  );
}

export default LoginPage;
