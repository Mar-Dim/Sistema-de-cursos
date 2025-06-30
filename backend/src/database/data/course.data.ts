
export const courseData = {
  // --- MÓDULO 1: Fundamentos de JavaScript ---
  10: { 
    id: 10, name: 'Bienvenida al Curso', type: 'LESSON', 
    content: '¡Hola y bienvenid@ a "JavaScript de Cero a Héroe"! Estoy muy emocionado de que estés aquí. En este curso, no solo aprenderás la sintaxis de uno de los lenguajes más populares del mundo, sino que también entenderás cómo "piensa" JavaScript. Construiremos proyectos, resolveremos problemas y, al final, tendrás la confianza para enfrentar cualquier desafío de programación. ¡Vamos a empezar!', 
    unlocks: [11]
  },
  11: { 
    id: 11, name: 'Variables y Tipos de Datos', type: 'LESSON', 
    content: 'Imagina que necesitas guardar información, como el nombre de un usuario o el número de vidas en un juego. Para eso usamos variables. En JavaScript moderno, tenemos dos palabras clave principales: `let` para variables que pueden cambiar su valor, y `const` para constantes, cuyo valor no cambiará una vez asignado. Por ejemplo: `let score = 0;` y `const maxLives = 3;`. Además, cada dato tiene un "tipo": `string` para texto, `number` para números, y `boolean` para verdadero o falso.', 
    unlocks: [12]
  },
  12: { 
    id: 12, name: 'Operadores Básicos', type: 'LESSON', 
    content: 'Los operadores son los símbolos que realizan acciones. Ya conoces los aritméticos: `+`, `-`, `*`, `/`. Pero los más importantes en la lógica de programación son los de comparación. El más crucial es la igualdad estricta `===`. Siempre usa `===` en lugar de `==` porque `===` comprueba tanto el valor como el tipo. Por ejemplo, `5 === "5"` es `false`, pero `5 == "5"` es `true`, ¡lo cual puede causar bugs inesperados!', 
    unlocks: [19]
  },
  19: { 
    id: 19, name: 'Quiz Rápido: Fundamentos', type: 'QUIZ', 
    content: '¡Es hora de poner a prueba tus conocimientos básicos!',
    requiredScore: 80,
    unlocks: [20],
    questions: [
      { text: '¿Qué palabra clave se usa para una variable que no se puede reasignar?', options: ['let', 'var', 'const', 'static'], correctAnswer: 2 },
      { text: 'El operador `===` comprueba igualdad de:', options: ['Solo valor', 'Solo tipo', 'Valor y tipo', 'Ninguna es correcta'], correctAnswer: 2 },
    ]
  },

  // --- MÓDULO 2: Funciones y Alcance (Scope) ---
  20: { 
    id: 20, name: 'Introducción a Funciones', type: 'LESSON', 
    content: 'Las funciones son el pilar de la reutilización de código. En lugar de escribir la misma lógica una y otra vez, la empaquetas en una función y la llamas cuando la necesites. Una función se declara así: `function miFuncion() { /* código aquí */ }` y se ejecuta llamándola: `miFuncion();`.', 
    unlocks: [21]
  },
  21: { 
    id: 21, name: 'Parámetros y Argumentos', type: 'LESSON', 
    content: 'Para hacer las funciones más potentes, podemos pasarles datos. Los "parámetros" son las variables que una función espera recibir, y los "argumentos" son los valores reales que le pasamos al llamarla. Ejemplo: `function saludar(nombre) { console.log("Hola, " + nombre); }`. Aquí, `nombre` es el parámetro. Al llamarla, `saludar("Ana");`, el string `"Ana"` es el argumento.',
    unlocks: [22]
  },
  22: {
    id: 22, name: 'Scope: Global, Función y Bloque', type: 'CASE_STUDY',
    content: 'El "Scope" (alcance) define dónde es accesible una variable. Una variable declarada fuera de cualquier función tiene un alcance global. Una declarada con `let` o `const` dentro de llaves `{}` (como en un `if` o un `for`) tiene un alcance de bloque, solo existe ahí dentro. Entender esto es crucial para evitar errores donde una variable "no está definida".',
    unlocks: [29]
  },
  29: { 
    id: 29, name: 'Quiz de Módulo: Funciones', type: 'QUIZ', 
    content: 'Demuestra tu dominio sobre las funciones y el scope.',
    requiredScore: 75,
    unlocks: [30, 40],
    unlocksOnFail: [90],
    questions: [
      { text: 'Una variable declarada con `let` dentro de una función tiene un alcance de...', options: ['Bloque', 'Global', 'Función', 'No tiene alcance'], correctAnswer: 2 },
      { text: '¿Qué es un "closure" en JavaScript?', options: ['Un error de sintaxis', 'Una función que recuerda su scope léxico', 'Un tipo de dato', 'Una variable global'], correctAnswer: 1 },
    ]
  },

  // --- MÓDULO 3: JavaScript Asíncrono ---
  30: { 
    id: 30, name: 'El Event Loop y el Callback Hell', type: 'LESSON', 
    content: 'JavaScript solo puede hacer una cosa a la vez (es "single-threaded"). Entonces, ¿cómo maneja operaciones lentas como una llamada a una API? Usando el "Event Loop". Este sistema permite que JS ponga en cola tareas lentas y continúe con otras cosas. Antes, esto se manejaba con "callbacks", funciones que se ejecutan cuando una tarea termina, pero anidarlos mucho creaba el temido "Callback Hell", un código ilegible.', 
    unlocks: [31]
  },
  31: { 
    id: 31, name: 'Promesas: La Solución Elegante', type: 'LESSON', 
    content: 'Las Promesas son objetos que representan la eventual finalización (o fallo) de una operación asíncrona. Una promesa tiene tres estados: pendiente, resuelta o rechazada. Podemos encadenar acciones usando `.then()` para cuando se resuelve y `.catch()` para manejar errores, evitando el Callback Hell y haciendo el código mucho más limpio y secuencial.',
    unlocks: [32]
  },
  32: {
    id: 32, name: 'Async/Await: Azúcar Sintáctico', type: 'CASE_STUDY',
    content: '`async/await` es una forma moderna y aún más legible de trabajar con promesas. Una función declarada con `async` siempre devuelve una promesa. Dentro de ella, podemos usar la palabra clave `await` para "pausar" la ejecución de la función hasta que una promesa se resuelva, haciendo que el código asíncrono se vea y se sienta como código síncrono. Ejemplo: `const data = await fetch(url);`.',
    unlocks: [39]
  },
  39: {
    id: 39, name: 'Evaluación: Asincronía', type: 'EVALUATION',
    content: 'Es hora de evaluar tu comprensión de la asincronía en JavaScript.',
    requiredScore: 80,
    unlocks: [50],
    questions: [
      { text: '¿Qué palabra clave se usa para esperar que una promesa se resuelva dentro de una función `async`?', options: ['wait', 'await', 'hold', 'pause'], correctAnswer: 1 },
      { text: 'El método `.catch()` de una promesa se ejecuta cuando...', options: ['La promesa se resuelve con éxito', 'La promesa es rechazada', 'Siempre', 'Nunca'], correctAnswer: 1 },
    ]
  },

  // --- MÓDULO 4: Interactuando con el DOM ---
  40: { 
    id: 40, name: '¿Qué es el DOM?', type: 'LESSON', 
    content: 'El DOM (Document Object Model) es una interfaz de programación para los documentos HTML. El navegador crea una representación en forma de árbol de tu página, y JavaScript puede interactuar con este árbol para añadir, eliminar o modificar elementos y contenido. ¡Es la clave para hacer páginas web dinámicas!', 
    unlocks: [41]
  },
  41: { 
    id: 41, name: 'Seleccionar Elementos', type: 'LESSON', 
    content: 'Para manipular un elemento, primero debes seleccionarlo. JavaScript nos da varios métodos para esto. El más versátil es `document.querySelector()`, que te permite usar cualquier selector de CSS para encontrar el primer elemento que coincida. Por ejemplo, `document.querySelector("#mi-id")` o `document.querySelector(".mi-clase")`. Si quieres todos los elementos que coincidan, usas `document.querySelectorAll()`.',
    unlocks: [49]
  },
  49: {
    id: 49, name: 'Quiz Rápido: DOM', type: 'QUIZ',
    content: 'Veamos qué tan bien puedes navegar por el DOM.',
    requiredScore: 90,
    unlocks: [50],
    questions: [
      { text: '¿Qué método devuelve una NodeList estática (una "foto" de los elementos en el momento de la llamada)?', options: ['getElementsByTagName', 'querySelectorAll', 'getElementsByClassName', 'getElementById'], correctAnswer: 1 },
    ]
  },

  // --- MÓDULO 5: Proyecto Final ---
  50: {
    id: 50, name: 'Proyecto Final: To-Do List Interactiva', type: 'EVALUATION',
    content: '¡El gran final! Tu tarea es aplicar todo lo que has aprendido para construir una aplicación de lista de tareas. Deberás usar manipulación del DOM para añadir y borrar tareas, y quizás `localStorage` para guardar las tareas entre sesiones. ¡Demuestra todo tu poder como desarrollador JavaScript!',
    requiredScore: 85,
    unlocks: [],
    questions: [
        {text: 'Al añadir un nuevo elemento a la lista, ¿qué método del DOM es más apropiado para crearlo en memoria?', options: ['document.createElement()', 'document.appendChild()', 'element.innerHTML', 'document.selectElement()'], correctAnswer: 0},
        {text: 'Para manejar el clic en un botón de "borrar tarea", ¿qué evento deberías escuchar?', options: ['mouseover', 'submit', 'keydown', 'click'], correctAnswer: 3}
    ]
  },

  // --- MÓDULOS DE REMEDIACIÓN / REPASO ---
  90: { 
    id: 90, name: 'Repaso: Funciones Clave y Scope', type: 'REMEDIATION', 
    content: '¡Vamos a repasar! Recuerda: el "scope" o alcance determina dónde puedes acceder a tus variables. `let` y `const` tienen alcance de bloque (`{}`). Una "closure" o clausura es una característica poderosa de JavaScript: es una función que "recuerda" el entorno en el que fue creada, manteniendo acceso a sus variables incluso si se ejecuta fuera de ese entorno. ¡Con esto claro, estás listo para intentar el quiz de nuevo!', 
    unlocks: [29]
  },
};