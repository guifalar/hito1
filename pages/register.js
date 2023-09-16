//Desarrollo de una Aplicación Web de Gestión de Tareas
//Hito 1: Desarrollo del Frontend en React (1/9)
//FE01: Lanzillota - Chaves
//Guillermo Fabiám Alarcón

// página de registro de usuario.

//Se importa React y la función useState de React para crear componentes de React 
//y gestionar el estado del componente.
import React, { useState } from 'react';
//Se importa useRouter de next/router, para gestionar la navegación.
import { useRouter } from 'next/router';

import styles from './RegisterPage.module.css'; // Importamos los estilos CSS
import Header from '../components/Header'; // Importamos el header
import Footer from '../components/Footer'; // Importamos el footer

//Se define una función llamada RegisterPage, que es un componente funcional de React.
//Dentro de la función Se utilizan los hooks de useState para declarar varias variables
// de estado que almacenan datos relacionados con el registro de usuario
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  //Se utiliza useRouter para obtener una instancia del enrutador de Next.js, 
  //que se utilizará para navegar a otras páginas después del registro.
  const router = useRouter();


//Se define una función handleRegister que se ejecutará cuando el usuario 
//haga clic en el botón "Registrarse"
  function handleRegister() {
    //Verifica si el correo electrónico es válido llamando la función validateEmail
    if (!validateEmail(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    //Si el correo electrónico es válido, almacena los datos del usuario en el 
    //almacenamiento local (localStorage), muestra un mensaje de éxito y 
    //redirige al usuario a la página de login después de 2 segundos.
    localStorage.setItem('user', JSON.stringify({ username, email, password }));
    setMessage(`¡Bienvenido, ${username}! Registro exitoso, ¡Vamos al Login!`);
    setUsername('');
    setEmail('');
    setPassword('');
    setTimeout(function() {
      router.push('/login');
    }, 2000);
  }
//Se define una función validateEmail para verificar si una dirección de correo electrónico 
//es válida.
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  //Se renderiza el componente, utilizando las clases CSS definidas en styles 
  //para aplicar estilos.
  return (
    <div className={styles.container}>
      {/* Se llama al header creado para la aplicacion*/}
      <Header />
        <h1 className={styles.title}>Registro de Usuario</h1>
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
          type="email"
          placeholder="Correo electrónico"
          value={email}
          
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
        />
        <br />
        {emailError && <p className={styles.error}>{emailError}</p>}
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {/* Se ejecuta la funcion handleRegister cuando se hace click en el boton*/}
        <button className={styles.button} onClick={handleRegister}>
          Registrarse
        </button>
        <p className={styles.message}>{message}</p>
      {/* Se llama al footer creado para la aplicacion*/}
      <Footer />
    </div>

  );
  
}

export default RegisterPage;
