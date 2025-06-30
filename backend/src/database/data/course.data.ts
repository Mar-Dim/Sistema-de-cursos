/**
 * Estructura de datos para el curso "JavaScript de Cero a Héroe".
 * Cada clave es un ID único que también se usa para el 'order' inicial.
 * 
 * Flujo del Curso:
 * - Módulo 1 (IDs 10-19): Introducción básica. Obligatorio.
 * - Módulo 2 (IDs 20-29): Funciones y Scope. El quiz 29 es la puerta al siguiente módulo.
 * - Módulo 3 (IDs 30-39): Programación Asíncrona. Un tema más avanzado.
 *   - Si el usuario falla el quiz del módulo 2 (ID 29), se le envía a una lección de repaso (ID 90).
 * - Módulo 4 (IDs 40-49): El DOM. Se desbloquea en paralelo al módulo 3 si se aprueba el quiz 29.
 * - Módulo 5 (IDs 50-59): Proyecto final, requiere completar los módulos 3 y 4.
 */
export const courseData = {
  // --- MÓDULO 1: Fundamentos de JavaScript ---
  10: { 
    id: 10, name: 'Bienvenida al Curso', type: 'LESSON', 
    content: 'Bienvenido a "JavaScript de Cero a Héroe". En este curso, transformaremos tu curiosidad en habilidad. ¡Comencemos!', 
    unlocks: [11] // Desbloquea la siguiente lección
  },
  11: { 
    id: 11, name: 'Variables y Tipos de Datos', type: 'LESSON', 
    content: 'Aprende sobre `let`, `const`, `var`, y los tipos de datos primitivos: string, number, boolean, null, undefined, y symbol.', 
    unlocks: [12]
  },
  12: { 
    id: 12, name: 'Operadores Básicos', type: 'LESSON', 
    content: 'Descubre los operadores aritméticos (+, -, *, /), de asignación (=), y de comparación (==, ===, !=, !==).', 
    unlocks: [19]
  },
  19: { 
    id: 19, name: 'Quiz Rápido: Fundamentos', type: 'QUIZ', 
    requiredScore: 80,
    unlocks: [20], // Si aprueba, va al Módulo 2
    questions: [
      { text: '¿Qué palabra clave se usa para una variable que no se puede reasignar?', options: ['let', 'var', 'const', 'static'], correctAnswer: 2 },
      { text: 'El operador `===` comprueba igualdad de:', options: ['Solo valor', 'Solo tipo', 'Valor y tipo', 'Ninguna es correcta'], correctAnswer: 2 },
    ]
  },

  // --- MÓDULO 2: Funciones y Alcance (Scope) ---
  20: { 
    id: 20, name: 'Introducción a Funciones', type: 'LESSON', 
    content: 'Las funciones son bloques de código reutilizables. Aprende a declararlas y a llamarlas.', 
    unlocks: [21]
  },
  21: { 
    id: 21, name: 'Parámetros y Argumentos', type: 'LESSON', 
    content: 'Entiende la diferencia entre parámetros (la definición) y argumentos (el valor pasado).',
    unlocks: [22]
  },
  22: {
    id: 22, name: 'Scope: Global, Función y Bloque', type: 'CASE_STUDY',
    content: 'Analiza este código y observa cómo el alcance afecta la visibilidad de las variables. El scope es uno de los conceptos más importantes en JS.',
    unlocks: [29]
  },
  29: { 
    id: 29, name: 'Quiz de Módulo: Funciones', type: 'QUIZ', 
    requiredScore: 75,
    unlocks: [30, 40], // DESBLOQUEO PARALELO: Si aprueba, abre los módulos 3 y 4.
    unlocksOnFail: [90], // Si falla, va a la lección de repaso.
    questions: [
      { text: 'Una variable declarada con `let` dentro de una función tiene un alcance de...', options: ['Bloque', 'Global', 'Función', 'No tiene alcance'], correctAnswer: 2 },
      { text: '¿Qué es un "closure" en JavaScript?', options: ['Un error de sintaxis', 'Una función que recuerda su scope léxico', 'Un tipo de dato', 'Una variable global'], correctAnswer: 1 },
    ]
  },

  // --- MÓDULO 3: JavaScript Asíncrono ---
  30: { 
    id: 30, name: 'El Event Loop y el Callback Hell', type: 'LESSON', 
    content: 'Descubre cómo JavaScript maneja operaciones asíncronas y por qué los callbacks anidados pueden ser un problema.', 
    unlocks: [31]
  },
  31: { 
    id: 31, name: 'Promesas: La Solución Elegante', type: 'LESSON', 
    content: 'Las promesas nos permiten escribir código asíncrono mucho más limpio. Aprende sobre `.then()`, `.catch()` y `.finally()`.',
    unlocks: [32]
  },
  32: {
    id: 32, name: 'Async/Await: Azúcar Sintáctico', type: 'CASE_STUDY',
    content: 'Refactoricemos un código basado en promesas para usar la sintaxis moderna de async/await. Observa la legibilidad.',
    unlocks: [39]
  },
  39: {
    id: 39, name: 'Evaluación: Asincronía', type: 'EVALUATION',
    requiredScore: 80,
    unlocks: [50], // Desbloquea el proyecto final.
    questions: [
      { text: '¿Qué palabra clave se usa para esperar que una promesa se resuelva dentro de una función `async`?', options: ['wait', 'await', 'hold', 'pause'], correctAnswer: 1 },
      { text: 'El método `.catch()` de una promesa se ejecuta cuando...', options: ['La promesa se resuelve con éxito', 'La promesa es rechazada', 'Siempre', 'Nunca'], correctAnswer: 1 },
    ]
  },

  // --- MÓDULO 4: Interactuando con el DOM ---
  40: { 
    id: 40, name: '¿Qué es el DOM?', type: 'LESSON', 
    content: 'El Document Object Model es la representación en árbol de tu HTML. Aprende a manipularlo con JavaScript.', 
    unlocks: [41]
  },
  41: { 
    id: 41, name: 'Seleccionar Elementos', type: 'LESSON', 
    content: 'Domina `getElementById`, `querySelector`, y `querySelectorAll` para encontrar cualquier elemento en tu página.',
    unlocks: [49]
  },
  49: {
    id: 49, name: 'Quiz Rápido: DOM', type: 'QUIZ',
    requiredScore: 90,
    unlocks: [50], // También desbloquea el proyecto final.
    questions: [
      { text: '¿Qué método devuelve una NodeList estática?', options: ['getElementsByTagName', 'querySelectorAll', 'getElementsByClassName', 'getElementById'], correctAnswer: 1 },
    ]
  },

  // --- MÓDULO 5: Proyecto Final ---
  50: {
    id: 50, name: 'Proyecto Final: To-Do List Interactiva', type: 'EVALUATION',
    content: 'Aplica todo lo aprendido para construir una lista de tareas funcional. Necesitas haber completado los módulos de asincronía y DOM.',
    requiredScore: 85,
    unlocks: [], // Fin del curso
    questions: [
      // Aquí habría preguntas más complejas o una evaluación de proyecto.
    ]
  },

  // --- MÓDULOS DE REMEDIACIÓN / REPASO ---
  90: { 
    id: 90, name: 'Repaso: Funciones Clave y Scope', type: 'REMEDIATION', 
    content: 'Repasemos. El scope determina dónde son visibles las variables. Un "closure" es una función que "recuerda" las variables de su entorno de creación, incluso si se ejecuta en otro lugar. ¡Intenta el quiz de nuevo!', 
    unlocks: [29] // Vuelve a enviar al usuario al quiz del Módulo 2.
  },
};