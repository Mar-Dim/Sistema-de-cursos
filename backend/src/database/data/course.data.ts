export const courseData = {
  1: {
    id: 1, name: 'Bienvenida al Curso', type: 'LESSON',
    content: '¡Hola y bienvenid@ a "JavaScript de Cero a Héroe"! En este curso, transformaremos tu curiosidad en habilidad, llevándote desde los conceptos más básicos hasta la creación de aplicaciones interactivas. ¡Prepárate para un viaje emocionante!',
    unlocks: [2]
  },
  2: {
    id: 2, name: 'Variables y Tipos de Datos', type: 'LESSON',
    content: 'Imagina que necesitas guardar información, como un nombre o un número. Para eso usamos "variables". En JavaScript, las variables pueden contener diferentes tipos de datos: números, texto (strings), booleanos (verdadero/falso) y más. Aprenderás a declararlas con `var`, `let` y `const`.',
    unlocks: [3]
  },
  3: {
    id: 3, name: 'Operadores Básicos', type: 'LESSON',
    content: 'Los operadores son símbolos que realizan acciones sobre nuestros datos. Veremos los operadores aritméticos (+, -, *, /) para hacer cálculos, los de comparación (>, <, ===) para evaluar condiciones, y los lógicos (&&, ||) para combinar verdades y falsedades.',
    unlocks: [4]
  },
  4: {
    id: 4, name: 'Quiz Rápido: Fundamentos', type: 'QUIZ',
    content: '¡Es hora de poner a prueba tus conocimientos básicos! Responde correctamente para desbloquear el siguiente módulo.',
    requiredScore: 80,
    unlocks: [6],
    unlocksOnFail: [5],
    questions: [
      { text: '¿Qué palabra clave se usa para una variable que no puede ser reasignada?', options: ['let', 'var', 'const', 'static'], correctAnswer: 2 },
      { text: 'El operador `===` comprueba igualdad de:', options: ['Solo valor', 'Solo tipo', 'Valor y tipo', 'Ninguna es correcta'], correctAnswer: 2 },
      { text: '¿Cuál es el resultado de ` "5" + 3 `?', options: ['8', '"53"', 'Error', 'NaN'], correctAnswer: 1 }
    ]
  },
  5: {
    id: 5, name: 'Refuerzo: Fundamentos JS', type: 'REMEDIATION',
    content: '¡No te preocupes! Repasemos: `const` es para valores fijos, `let` para variables que pueden cambiar. Los operadores nos ayudan a calcular y comparar. ¡Tú puedes! Vuelve a intentarlo.',
    unlocks: [10]
  },

  // === MÓDULO 2: FUNCIONES Y SCOPE ===
  6: {
    id: 6, name: 'Introducción a Funciones', type: 'LESSON',
    content: 'Las funciones son el pilar de la programación modular. Son bloques de código reutilizables que realizan una tarea específica. Puedes llamarlas cuantas veces quieras, haciendo tu código más organizado y eficiente.',
    unlocks: [7]
  },
  7: {
    id: 7, name: 'Parámetros y Argumentos', type: 'LESSON',
    content: 'Las funciones pueden ser más flexibles si aceptan datos. Los "parámetros" son las variables que una función espera recibir, y los "argumentos" son los valores reales que le pasas cuando la llamas.',
    unlocks: [8]
  },
  8: {
    id: 8, name: 'Scope: Global, Función y Bloque', type: 'CASE_STUDY',
    content: 'El "Scope" o alcance define dónde es accesible una variable. Una variable global se puede usar en cualquier parte; una con scope de función, solo dentro de esa función; y una con scope de bloque (con `let` o `const`), solo dentro de su bloque `{...}`.',
    unlocks: [9]
  },
  9: {
    id: 9, name: 'Quiz de Módulo: Funciones', type: 'QUIZ',
    content: 'Demuestra tu dominio sobre las funciones y el scope.',
    requiredScore: 75,
    unlocks: [11],
    unlocksOnFail: [10],
    questions: [
      { text: 'Una variable declarada con `let` dentro de una función tiene un alcance de...', options: ['Bloque', 'Global', 'Función', 'No tiene alcance'], correctAnswer: 0 },
      { text: '¿Qué es un "closure" en JavaScript?', options: ['Un error de sintaxis', 'Una función que recuerda su scope léxico', 'Un tipo de dato', 'Una variable global'], correctAnswer: 1 }
    ]
  },
   10: {
    id: 10, name: 'Repaso: Funciones y Scope', type: 'REMEDIATION',
    content: 'Vamos a repasar juntos. Recuerda: una función es un bloque de código. Los parámetros son sus "entradas". El "scope" define qué variables puedes ver y desde dónde. ¡Intenta el quiz de nuevo!',
    unlocks: [11]
  },

  // === MÓDULO 3: ASINCRONÍA ===
  11: {
    id: 11, name: 'Event Loop y Callback Hell', type: 'LESSON',
    unlocks: [12],
    content: 'JavaScript es "single-threaded", solo puede hacer una cosa a la vez. El "Event Loop" es el mecanismo que le permite manejar operaciones asíncronas (como peticiones a un servidor o timers) sin bloquear el hilo principal. Cuando anidamos muchos callbacks, caemos en el "Callback Hell", dificultando la lectura del código.'
  },
  12: {
    id: 12, name: 'Promesas: La Solución Elegante', type: 'LESSON',
    unlocks: [13],
    content: 'Las promesas llegaron para resolver el Callback Hell. Una Promesa es un objeto que representa la eventual finalización (o fallo) de una operación asíncrona. Pasa por tres estados: pendiente (pending), cumplida (fulfilled) o rechazada (rejected). Nos permiten encadenar acciones con `.then()` y manejar errores con `.catch()`.'
  },
  13: {
    id: 13, name: 'Async/Await: Azúcar Sintáctico', type: 'CASE_STUDY',
    unlocks: [14],
    content: '`async/await` es una forma más moderna y legible de trabajar con promesas. Hace que el código asincrónico parezca síncrono. Una función declarada con `async` siempre devuelve una promesa, y la palabra clave `await` pausa la ejecución de la función hasta que una promesa se resuelva.'
  },
  14: {
    id: 14, name: 'Evaluación: Asincronía', type: 'EVALUATION',
    content: 'Evalúa tu comprensión sobre asincronía en JavaScript.',
    requiredScore: 80,
    unlocks: [16],
    unlocksOnFail: [15],
    questions: [
      { text: '¿Qué palabra clave se usa para esperar que una promesa se resuelva dentro de una función `async`?', options: ['wait', 'await', 'hold', 'pause'], correctAnswer: 1 },
      { text: 'El método `.catch()` de una promesa se ejecuta cuando...', options: ['La promesa se resuelve', 'La promesa es rechazada', 'Siempre', 'Nunca'], correctAnswer: 1 }
    ]
  },
  15: {
    id: 15, name: 'Refuerzo: Asincronía', type: 'REMEDIATION',
    content: 'La asincronía puede ser confusa. Piensa en `async/await` como una forma de decirle a tu código: "Espera aquí a que esta tarea (Promesa) termine antes de continuar". Esto evita el desorden de los callbacks. ¡Vamos a por ello!',
    unlocks: [16]
  },

  // === MÓDULO 4: INTERACCIÓN CON EL NAVEGADOR (DOM) ===
  16: {
    id: 16, name: 'El DOM: Qué y Cómo', type: 'LESSON',
    unlocks: [17],
    content: 'El DOM (Document Object Model) es una representación en forma de árbol de tu documento HTML. JavaScript puede interactuar con este árbol para leer y modificar dinámicamente el contenido, la estructura y el estilo de una página web, creando experiencias interactivas.'
  },
  17: {
    id: 17, name: 'Seleccionar y Modificar Elementos', type: 'LESSON',
    unlocks: [18],
    content: 'Para manipular un elemento, primero debes seleccionarlo. Aprenderás a usar `document.getElementById()`, `getElementsByClassName()`, y los más versátiles `querySelector()` y `querySelectorAll()`. Una vez seleccionado, podrás cambiar su texto, HTML, estilos y atributos.'
  },
  18: {
    id: 18, name: 'Quiz DOM', type: 'QUIZ',
    content: 'Pon a prueba tu habilidad para manipular el DOM.',
    requiredScore: 90,
    unlocks: [20],
    unlocksOnFail: [19],
    questions: [
      { text: '¿Qué método devuelve una NodeList estática de elementos que coinciden con un selector CSS?', options: ['getElementsByTagName', 'querySelectorAll', 'getElementsByClassName', 'getElementById'], correctAnswer: 1 },
      { text: '¿Cómo cambiarías el texto de un párrafo con id "saludo"?', options: ['saludo.text = "Hola";', 'saludo.innerHTML = "Hola";', 'saludo.content = "Hola";', 'saludo.change("Hola");'], correctAnswer: 1 }
    ]
  },
  19: {
    id: 19, name: 'Refuerzo: DOM y Selectores', type: 'REMEDIATION',
    content: '¡El DOM es tu lienzo! Para pintar en él, primero elige el pincel correcto. `querySelector` es genial para encontrar un elemento específico con un selector CSS. Una vez lo tienes, puedes cambiar casi todo sobre él. ¡Practiquemos!',
    unlocks: [20]
  },

  // === MÓDULO FINAL: PROYECTO ===
  20: {
    id: 20, name: 'Proyecto Final: To-Do List', type: 'EVALUATION',
    content: '¡Es hora de aplicar todo lo aprendido! Crea una aplicación de lista de tareas (To-Do List) que permita al usuario añadir, eliminar y marcar tareas como completadas. Deberás manipular el DOM y, como reto extra, usar `localStorage` para que las tareas persistan al recargar la página.',
    requiredScore: 85,
    unlocks: [21], // Desbloquea el certificado/finalización
    questions: [
      { text: '¿Qué método del DOM usarías para crear un nuevo elemento `<li>`?', options: ['document.createElement("li")', 'document.create("li")', 'document.newElement("li")', 'document.build("li")'], correctAnswer: 0 },
      { text: '¿Qué evento del teclado es útil para detectar cuándo el usuario presiona "Enter" en un input?', options: ['mouseover', 'submit', 'keydown', 'click'], correctAnswer: 2 }
    ]
  },

  // === FINALIZACIÓN ===
  21: {
    id: 21, name: '¡Felicitaciones, eres un Héroe de JavaScript!',
    type: 'LESSON',
    content: 'Has completado con éxito todos los módulos y el proyecto final. Has demostrado tener una sólida comprensión de JavaScript. ¡Sigue practicando y construyendo cosas increíbles! Aquí tienes tu certificado.',
    unlocks: []
  },

 
  
};