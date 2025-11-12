// Función para mostrar/ocultar el menú móvil
function toggleMobileMenu() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('menu-toggle');
    
    if (nav && toggle) {
        nav.classList.toggle('mobile-active');
        toggle.classList.toggle('active');
    }
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('menu-toggle');
    
    if (nav && toggle) {
        nav.classList.remove('mobile-active');
        toggle.classList.remove('active');
    }
}

// Función para hacer scroll considerando el header sticky
function scrollToElement(element, offset = 0) {
    if (!element) return;
    
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Calcular posición del elemento de manera más precisa
    let elementPosition = 0;
    
    // Intentar obtener la posición usando diferentes métodos
    if (element.classList.contains('active')) {
        // Si está visible, usar getBoundingClientRect
        const rect = element.getBoundingClientRect();
        elementPosition = rect.top + window.pageYOffset;
    } else {
        // Si no está visible, calcular desde el offsetTop acumulado
        let currentElement = element;
        while (currentElement) {
            elementPosition += currentElement.offsetTop;
            currentElement = currentElement.offsetParent;
        }
    }
    
    // Calcular posición final considerando header y offset adicional
    const offsetPosition = Math.max(0, elementPosition - headerHeight - offset);
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Función para mostrar la página de inicio (home)
function showHome() {
    // Ocultar todas las unidades
    const unitsSection = document.getElementById('units-section');
    const homeSection = document.getElementById('home-section');
    
    // Ocultar unidades
    if (unitsSection) {
        unitsSection.classList.remove('active');
    }
    
    // Mostrar home
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // Actualizar navegación
    updateNavigation('home');
    
    // Cerrar menú móvil si está abierto
    closeMobileMenu();
    
    // Scroll suave al inicio considerando el header
    // Esperar a que la animación de fadeInUp comience antes de hacer scroll
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (homeSection && homeSection.classList.contains('active')) {
                    scrollToElement(homeSection, 20);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        });
    });
}

// Función para mostrar/ocultar unidades
function showUnit(unitNumber) {
    // Ocultar home
    const homeSection = document.getElementById('home-section');
    const unitsSection = document.getElementById('units-section');
    
    if (homeSection) {
        homeSection.classList.remove('active');
    }
    
    // Mostrar sección de unidades
    if (unitsSection) {
        unitsSection.classList.add('active');
    }
    
    // Ocultar todas las unidades
    for (let i = 1; i <= 4; i++) {
        const unitCard = document.getElementById(`unit-${i}`);
        if (unitCard) {
            unitCard.classList.remove('active');
        }
    }
    
    // Mostrar la unidad seleccionada
    const selectedUnit = document.getElementById(`unit-${unitNumber}`);
    if (selectedUnit) {
        selectedUnit.classList.add('active');
    }
    
    // Si es la unidad 1, asegurarse de que los ejercicios estén cargados
    if (unitNumber === 1) {
        if (exercisesUnit1.length === 0) {
            // Si no hay ejercicios cargados, intentar cargarlos
            loadExercises1();
        } else if (!currentExercise1) {
            // Si hay ejercicios pero no hay ejercicio actual, cargar uno
            loadRandomExercise1();
        } else {
            // Asegurarse de que la interfaz esté actualizada
            setTimeout(() => {
                updateExercise1UI();
            }, 100);
        }
    }
    
    // Si es la unidad 2, asegurarse de que los ejercicios estén cargados
    if (unitNumber === 2) {
        if (exercisesUnit2.length === 0) {
            // Si no hay ejercicios cargados, intentar cargarlos
            loadExercises2();
        } else if (!currentExercise2) {
            // Si hay ejercicios pero no hay ejercicio actual, cargar uno
            loadRandomExercise2();
        } else {
            // Asegurarse de que la interfaz esté actualizada
            setTimeout(() => {
                updateExercise2UI();
            }, 100);
        }
    }
    
    // Si es la unidad 3, asegurarse de que los ejercicios estén cargados
    if (unitNumber === 3) {
        if (exercisesUnit3.length === 0) {
            // Si no hay ejercicios cargados, intentar cargarlos
            loadExercises3();
        } else if (!currentExercise3) {
            // Si hay ejercicios pero no hay ejercicio actual, cargar uno
            loadRandomExercise3();
        } else {
            // Asegurarse de que la interfaz esté actualizada
            setTimeout(() => {
                updateExercise3UI();
            }, 100);
        }
    }
    
    // Si es la unidad 4, asegurarse de que los ejercicios estén cargados
    if (unitNumber === 4) {
        if (exercisesUnit4.length === 0) {
            // Si no hay ejercicios cargados, intentar cargarlos
            loadExercises4();
        } else if (!currentExercise4) {
            // Si hay ejercicios pero no hay ejercicio actual, cargar uno
            loadRandomExercise4();
        } else {
            // Asegurarse de que la interfaz esté actualizada
            setTimeout(() => {
                updateExercise4UI();
            }, 100);
        }
    }
    
    // Actualizar navegación
    updateNavigation(`unit-${unitNumber}`);
    
    // Cerrar menú móvil si está abierto
    closeMobileMenu();
    
    // Scroll suave a la sección de unidades considerando el header
    // Esperar a que la animación de fadeInUp comience antes de hacer scroll
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (unitsSection && unitsSection.classList.contains('active')) {
                    scrollToElement(unitsSection, 20);
                }
            }, 100);
        });
    });
}

// Función para actualizar el estado activo de la navegación
function updateNavigation(activeId) {
    // Remover active de todos los botones
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Agregar active al botón correspondiente
    if (activeId === 'home') {
        const homeBtn = document.getElementById('nav-home');
        if (homeBtn) homeBtn.classList.add('active');
    } else {
        const unitBtn = document.getElementById(`nav-${activeId}`);
        if (unitBtn) unitBtn.classList.add('active');
    }
}

function toggleExercise(exerciseNumber) {
    const exerciseContent = document.getElementById(`exercise-${exerciseNumber}`);
    exerciseContent.classList.toggle('active');
}

// ========== EJERCICIO 1: TABLA DE FRECUENCIAS ==========
// Datos de ejercicios embebidos como respaldo
const defaultExercisesUnit1 = [
  {
    "id": 1,
    "title": "Calificaciones de Estudiantes",
    "description": "Se registraron las calificaciones de 20 estudiantes",
    "data": [8, 7, 9, 6, 8, 7, 8, 9, 7, 6, 8, 9, 7, 8, 9, 6, 7, 8, 9, 8],
    "values": [6, 7, 8, 9]
  },
  {
    "id": 2,
    "title": "Edades de Empleados",
    "description": "Se registraron las edades de 25 empleados de una empresa",
    "data": [22, 23, 24, 25, 22, 23, 24, 25, 26, 22, 23, 24, 25, 22, 23, 24, 25, 26, 22, 23, 24, 25, 22, 23, 24],
    "values": [22, 23, 24, 25, 26]
  },
  {
    "id": 3,
    "title": "Número de Hermanos",
    "description": "Se preguntó a 30 estudiantes cuántos hermanos tienen",
    "data": [0, 1, 2, 3, 1, 2, 0, 1, 2, 3, 1, 2, 0, 1, 2, 3, 1, 2, 0, 1, 2, 3, 1, 2, 0, 1, 2, 3, 1, 2],
    "values": [0, 1, 2, 3]
  },
  {
    "id": 4,
    "title": "Horas de Estudio Semanales",
    "description": "Se registraron las horas de estudio semanales de 18 estudiantes",
    "data": [10, 12, 15, 10, 12, 15, 18, 10, 12, 15, 10, 12, 15, 18, 10, 12, 15, 10],
    "values": [10, 12, 15, 18]
  },
  {
    "id": 5,
    "title": "Puntuación en Examen",
    "description": "Se registraron las puntuaciones de 22 estudiantes en un examen",
    "data": [70, 75, 80, 85, 90, 70, 75, 80, 85, 90, 70, 75, 80, 85, 90, 70, 75, 80, 85, 90, 70, 75],
    "values": [70, 75, 80, 85, 90]
  },
  {
    "id": 6,
    "title": "Número de Aplicaciones Móviles",
    "description": "Se preguntó a 24 personas cuántas aplicaciones móviles tienen instaladas",
    "data": [5, 10, 15, 20, 5, 10, 15, 20, 25, 5, 10, 15, 20, 5, 10, 15, 20, 25, 5, 10, 15, 20, 5, 10],
    "values": [5, 10, 15, 20, 25]
  },
  {
    "id": 7,
    "title": "Tiempo de Conexión (minutos)",
    "description": "Se registró el tiempo de conexión diario de 16 usuarios en minutos",
    "data": [30, 45, 60, 90, 30, 45, 60, 90, 120, 30, 45, 60, 90, 30, 45, 60],
    "values": [30, 45, 60, 90, 120]
  },
  {
    "id": 8,
    "title": "Ventas Diarias",
    "description": "Se registraron las ventas diarias de un producto durante 20 días",
    "data": [10, 12, 15, 10, 12, 15, 18, 10, 12, 15, 10, 12, 15, 18, 10, 12, 15, 10, 12, 15],
    "values": [10, 12, 15, 18]
  },
  {
    "id": 9,
    "title": "Número de Dispositivos",
    "description": "Se preguntó a 28 personas cuántos dispositivos electrónicos poseen",
    "data": [1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
    "values": [1, 2, 3, 4, 5]
  },
  {
    "id": 10,
    "title": "Calificaciones de Proyecto",
    "description": "Se registraron las calificaciones de 24 proyectos",
    "data": [3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5],
    "values": [3, 4, 5]
  }
];

let exercisesUnit1 = [];
let currentExercise1 = null;
let currentFrequencies1 = {};
let currentTotal1 = 0;
let currentValues1 = [];

// Cargar ejercicios desde JSON
async function loadExercises1() {
    // Intentar diferentes rutas posibles
    const possiblePaths = [
        'exercises-unit1.json',
        './exercises-unit1.json',
        'estadistica/exercises-unit1.json',
        './estadistica/exercises-unit1.json'
    ];
    
    let loaded = false;
    
    for (const path of possiblePaths) {
        try {
            console.log(`Intentando cargar desde: ${path}`);
            const response = await fetch(path);
            
            if (!response.ok) {
                console.warn(`Respuesta no OK para ${path}: ${response.status} ${response.statusText}`);
                continue;
            }
            
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0) {
                exercisesUnit1 = data;
                console.log(`✅ Ejercicios cargados exitosamente desde: ${path} (${data.length} ejercicios)`);
                loaded = true;
                // Cargar un ejercicio aleatorio al inicio
                loadRandomExercise1();
                break;
            } else {
                console.warn(`Datos inválidos desde ${path}: no es un array o está vacío`);
            }
        } catch (error) {
            console.warn(`Error al cargar desde ${path}:`, error.message);
            continue;
        }
    }
    
    // Si no se pudo cargar desde ningún archivo, usar datos embebidos
    if (!loaded) {
        console.warn('⚠️ No se pudo cargar el archivo JSON, usando datos embebidos');
        exercisesUnit1 = defaultExercisesUnit1;
        console.log(`✅ Usando ${exercisesUnit1.length} ejercicios embebidos`);
        loadRandomExercise1();
    }
}

// Calcular frecuencias de un conjunto de datos
function calculateFrequenciesFromData(data) {
    const frequencies = {};
    data.forEach(value => {
        frequencies[value] = (frequencies[value] || 0) + 1;
    });
    return frequencies;
}

// Cargar un ejercicio aleatorio
function loadRandomExercise1() {
    if (exercisesUnit1.length === 0) return;
    
    // Si hay más de un ejercicio, evitar repetir el actual
    let availableExercises = exercisesUnit1;
    if (exercisesUnit1.length > 1 && currentExercise1) {
        availableExercises = exercisesUnit1.filter(ex => ex.id !== currentExercise1.id);
    }
    
    // Seleccionar un ejercicio aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    currentExercise1 = availableExercises[randomIndex];
    
    // Calcular frecuencias correctas
    currentFrequencies1 = calculateFrequenciesFromData(currentExercise1.data);
    currentTotal1 = currentExercise1.data.length;
    currentValues1 = [...currentExercise1.values].sort((a, b) => a - b);
    
    // Actualizar la interfaz
    updateExercise1UI();
}

// Actualizar la interfaz del ejercicio
function updateExercise1UI() {
    if (!currentExercise1) {
        console.error('No hay ejercicio actual para mostrar');
        return;
    }
    
    // Verificar que los elementos del DOM existan
    const titleEl = document.getElementById('exercise1-title');
    const descEl = document.getElementById('exercise1-description');
    const dataEl = document.getElementById('exercise1-data');
    const tbody = document.getElementById('table-unit1');
    const resultEl = document.getElementById('result-1');
    
    if (!titleEl || !descEl || !dataEl || !tbody) {
        console.error('Elementos del DOM no encontrados. Esperando a que se cargue la unidad 1...');
        // Reintentar después de un breve delay
        setTimeout(() => {
            if (currentExercise1) {
                updateExercise1UI();
            }
        }, 500);
        return;
    }
    
    // Actualizar título y descripción
    titleEl.textContent = `Ejercicio: ${currentExercise1.title}`;
    descEl.textContent = `${currentExercise1.description}:`;
    
    // Mostrar datos
    dataEl.textContent = currentExercise1.data.join(', ');
    dataEl.style.display = 'block';
    
    // Generar tabla dinámicamente
    tbody.innerHTML = '';
    
    currentValues1.forEach((value, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${value}</td>
            <td><input type="number" id="f1-${value}" placeholder="?" min="0" class="freq-input"></td>
            <td><span id="fr1-${value}">-</span></td>
            <td><span id="fa1-${value}">-</span></td>
        `;
        tbody.appendChild(row);
    });
    
    // Agregar event listeners a los nuevos inputs
    currentValues1.forEach(value => {
        const input = document.getElementById(`f1-${value}`);
        if (input) {
            input.addEventListener('input', calculateFrequencies1);
        }
    });
    
    // Limpiar resultado si existe
    if (resultEl) {
        resultEl.className = 'result-message';
    }
    
    console.log(`✅ Interfaz actualizada para ejercicio: ${currentExercise1.title}`);
}

// Calcular frecuencias relativas y acumuladas
function calculateFrequencies1() {
    let accumulated = 0;
    
    currentValues1.forEach(value => {
        const input = document.getElementById(`f1-${value}`);
        const freqInput = parseInt(input.value) || 0;
        const freqRel = (freqInput / currentTotal1).toFixed(3);
        accumulated += freqInput;
        
        document.getElementById(`fr1-${value}`).textContent = freqRel;
        document.getElementById(`fa1-${value}`).textContent = accumulated;
    });
}

// Verificar respuesta
function checkExercise1() {
    const resultDiv = document.getElementById('result-1');
    let allFilled = true;
    let allCorrect = true;
    const userAnswers = {};
    
    // Recopilar respuestas del usuario
    currentValues1.forEach(value => {
        const input = document.getElementById(`f1-${value}`);
        const userFreq = parseInt(input.value);
        
        if (!input.value || isNaN(userFreq)) {
            allFilled = false;
        } else {
            userAnswers[value] = userFreq;
            if (userFreq !== currentFrequencies1[value]) {
                allCorrect = false;
            }
        }
    });
    
    if (!allFilled) {
        resultDiv.className = 'result-message error show';
        resultDiv.textContent = 'Por favor completa todos los campos de frecuencia.';
        return;
    }
    
    if (allCorrect) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Correcto! Has completado la tabla de frecuencias correctamente.';
    } else {
        let correctAnswers = currentValues1.map(v => `${v}→${currentFrequencies1[v]}`).join(', ');
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = `Incorrecto. Revisa tus respuestas.<br>
            Frecuencias correctas: ${correctAnswers}`;
    }
}

// Mostrar solución
function showSolution1() {
    if (!currentExercise1) return;
    
    // Llenar los valores correctos
    currentValues1.forEach(value => {
        document.getElementById(`f1-${value}`).value = currentFrequencies1[value];
    });
    
    // Calcular frecuencias relativas y acumuladas
    calculateFrequencies1();
    
    // Mostrar información de la solución
    const resultDiv = document.getElementById('result-1');
    let freqText = currentValues1.map(v => `${v}→${currentFrequencies1[v]}`).join(', ');
    let freqRelText = currentValues1.map(v => {
        const rel = (currentFrequencies1[v] / currentTotal1).toFixed(3);
        return `${v}→${rel}`;
    }).join(', ');
    
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        Frecuencias (fi): ${freqText}<br>
        Frecuencias relativas (fr): ${freqRelText}<br>
        Total de datos: ${currentTotal1}`;
}

// Reiniciar ejercicio (cargar uno nuevo aleatorio)
function resetExercise1() {
    // Cargar un nuevo ejercicio aleatorio
    loadRandomExercise1();
}

// ========== EJERCICIO 2: PARÁMETROS ESTADÍSTICOS ==========
// Datos de ejercicios embebidos como respaldo
const defaultExercisesUnit2 = [
  {
    "id": 1,
    "title": "Tiempo de Respuesta del Sistema",
    "description": "Se registraron los tiempos de respuesta (en segundos) de un sistema informático",
    "data": [12, 15, 18, 20, 22, 15, 18, 20, 15, 18]
  },
  {
    "id": 2,
    "title": "Calificaciones de Examen",
    "description": "Se registraron las calificaciones de 12 estudiantes en un examen",
    "data": [75, 80, 85, 90, 75, 80, 85, 90, 95, 75, 80, 85]
  },
  {
    "id": 3,
    "title": "Ventas Mensuales",
    "description": "Se registraron las ventas mensuales (en miles de pesos) de una tienda durante 10 meses",
    "data": [45, 50, 55, 60, 45, 50, 55, 60, 65, 45]
  },
  {
    "id": 4,
    "title": "Temperatura del Servidor",
    "description": "Se registró la temperatura (en grados Celsius) de un servidor durante 14 mediciones",
    "data": [32, 35, 38, 40, 32, 35, 38, 40, 42, 32, 35, 38, 40, 32]
  },
  {
    "id": 5,
    "title": "Horas de Trabajo Semanales",
    "description": "Se registraron las horas de trabajo semanales de 11 empleados",
    "data": [35, 40, 45, 35, 40, 45, 50, 35, 40, 45, 35]
  },
  {
    "id": 6,
    "title": "Velocidad de Internet",
    "description": "Se midió la velocidad de internet (en Mbps) en 13 pruebas diferentes",
    "data": [25, 30, 35, 40, 25, 30, 35, 40, 45, 25, 30, 35, 25]
  },
  {
    "id": 7,
    "title": "Peso de Paquetes",
    "description": "Se registró el peso (en kilogramos) de 9 paquetes enviados",
    "data": [2.5, 3.0, 3.5, 4.0, 2.5, 3.0, 3.5, 4.0, 2.5]
  },
  {
    "id": 8,
    "title": "Edad de Usuarios",
    "description": "Se registró la edad de 15 usuarios de una plataforma",
    "data": [18, 22, 25, 28, 18, 22, 25, 28, 30, 18, 22, 25, 28, 18, 22]
  },
  {
    "id": 9,
    "title": "Memoria RAM Utilizada",
    "description": "Se registró el porcentaje de memoria RAM utilizada en 12 mediciones",
    "data": [45, 50, 55, 60, 45, 50, 55, 60, 65, 45, 50, 55]
  },
  {
    "id": 10,
    "title": "Tiempo de Carga de Página",
    "description": "Se midió el tiempo de carga (en milisegundos) de una página web en 10 pruebas",
    "data": [120, 150, 180, 200, 120, 150, 180, 200, 220, 120]
  }
];

let exercisesUnit2 = [];
let currentExercise2 = null;
let currentSolutions2 = null;

// Cargar ejercicios desde JSON
async function loadExercises2() {
    // Intentar diferentes rutas posibles
    const possiblePaths = [
        'exercises-unit2.json',
        './exercises-unit2.json',
        'estadistica/exercises-unit2.json',
        './estadistica/exercises-unit2.json'
    ];
    
    let loaded = false;
    
    for (const path of possiblePaths) {
        try {
            console.log(`Intentando cargar ejercicios unidad 2 desde: ${path}`);
            const response = await fetch(path);
            
            if (!response.ok) {
                console.warn(`Respuesta no OK para ${path}: ${response.status} ${response.statusText}`);
                continue;
            }
            
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0) {
                exercisesUnit2 = data;
                console.log(`✅ Ejercicios unidad 2 cargados exitosamente desde: ${path} (${data.length} ejercicios)`);
                loaded = true;
                // Cargar un ejercicio aleatorio al inicio
                loadRandomExercise2();
                break;
            } else {
                console.warn(`Datos inválidos desde ${path}: no es un array o está vacío`);
            }
        } catch (error) {
            console.warn(`Error al cargar desde ${path}:`, error.message);
            continue;
        }
    }
    
    // Si no se pudo cargar desde ningún archivo, usar datos embebidos
    if (!loaded) {
        console.warn('⚠️ No se pudo cargar el archivo JSON unidad 2, usando datos embebidos');
        exercisesUnit2 = defaultExercisesUnit2;
        console.log(`✅ Usando ${exercisesUnit2.length} ejercicios embebidos unidad 2`);
        loadRandomExercise2();
    }
}

// Calcular estadísticas de un conjunto de datos
function calculateStats2(data) {
    const sortedData = [...data].sort((a, b) => a - b);
    const n = data.length;
    
    // Media
    const mean = data.reduce((a, b) => a + b, 0) / n;
    
    // Mediana
    let median;
    if (n % 2 === 0) {
        // Si es par, promedio de los dos valores centrales
        median = (sortedData[n/2 - 1] + sortedData[n/2]) / 2;
    } else {
        // Si es impar, valor central
        median = sortedData[Math.floor(n/2)];
    }
    
    // Moda
    const freq = {};
    data.forEach(x => freq[x] = (freq[x] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const mode = parseInt(Object.keys(freq).find(key => freq[key] === maxFreq));
    
    // Rango
    const range = Math.max(...data) - Math.min(...data);
    
    // Varianza
    const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
    
    // Desviación estándar
    const stdDev = Math.sqrt(variance);
    
    return { 
        mean: mean.toFixed(2), 
        median: median.toFixed(2), 
        mode: mode, 
        range: range, 
        variance: variance.toFixed(2), 
        stdDev: stdDev.toFixed(2) 
    };
}

// Cargar un ejercicio aleatorio
function loadRandomExercise2() {
    if (exercisesUnit2.length === 0) return;
    
    // Si hay más de un ejercicio, evitar repetir el actual
    let availableExercises = exercisesUnit2;
    if (exercisesUnit2.length > 1 && currentExercise2) {
        availableExercises = exercisesUnit2.filter(ex => ex.id !== currentExercise2.id);
    }
    
    // Seleccionar un ejercicio aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    currentExercise2 = availableExercises[randomIndex];
    
    // Calcular soluciones correctas
    currentSolutions2 = calculateStats2(currentExercise2.data);
    
    // Actualizar la interfaz
    updateExercise2UI();
}

// Actualizar la interfaz del ejercicio
function updateExercise2UI() {
    if (!currentExercise2) {
        console.error('No hay ejercicio actual unidad 2 para mostrar');
        return;
    }
    
    // Verificar que los elementos del DOM existan
    const titleEl = document.getElementById('exercise2-title');
    const descEl = document.getElementById('exercise2-description');
    const dataEl = document.getElementById('exercise2-data');
    
    if (!titleEl || !descEl || !dataEl) {
        console.error('Elementos del DOM unidad 2 no encontrados. Esperando a que se cargue la unidad 2...');
        // Reintentar después de un breve delay
        setTimeout(() => {
            if (currentExercise2) {
                updateExercise2UI();
            }
        }, 500);
        return;
    }
    
    // Actualizar título y descripción
    titleEl.textContent = `Ejercicio: ${currentExercise2.title}`;
    descEl.textContent = `${currentExercise2.description}:`;
    
    // Mostrar datos
    dataEl.textContent = currentExercise2.data.join(', ');
    dataEl.style.display = 'block';
    
    // Limpiar campos de entrada
    ['mean-2', 'median-2', 'mode-2', 'range-2', 'variance-2', 'stddev-2'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });
    
    // Limpiar resultado
    const resultEl = document.getElementById('result-2');
    if (resultEl) {
        resultEl.className = 'result-message';
    }
    
    console.log(`✅ Interfaz actualizada para ejercicio unidad 2: ${currentExercise2.title}`);
}

function checkExercise2() {
    if (!currentSolutions2) {
        console.error('No hay soluciones disponibles para verificar');
        return;
    }
    
    const mean = parseFloat(document.getElementById('mean-2').value);
    const median = parseFloat(document.getElementById('median-2').value);
    const mode = parseInt(document.getElementById('mode-2').value);
    const range = parseInt(document.getElementById('range-2').value);
    const variance = parseFloat(document.getElementById('variance-2').value);
    const stdDev = parseFloat(document.getElementById('stddev-2').value);
    
    const resultDiv = document.getElementById('result-2');
    
    // Verificar que todos los campos estén completos
    if (isNaN(mean) || isNaN(median) || isNaN(mode) || isNaN(range) || isNaN(variance) || isNaN(stdDev)) {
        resultDiv.className = 'result-message error show';
        resultDiv.textContent = 'Por favor completa todos los campos.';
        return;
    }
    
    const correct = Math.abs(mean - parseFloat(currentSolutions2.mean)) < 0.1 &&
                    Math.abs(median - parseFloat(currentSolutions2.median)) < 0.1 &&
                    mode === currentSolutions2.mode &&
                    range === currentSolutions2.range &&
                    Math.abs(variance - parseFloat(currentSolutions2.variance)) < 0.1 &&
                    Math.abs(stdDev - parseFloat(currentSolutions2.stdDev)) < 0.1;
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Excelente! Todas las respuestas son correctas.';
    } else {
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = `Algunas respuestas son incorrectas. Revisa tus cálculos.<br>
            Respuestas correctas: Media=${currentSolutions2.mean}, Mediana=${currentSolutions2.median}, Moda=${currentSolutions2.mode}, 
            Rango=${currentSolutions2.range}, Varianza=${currentSolutions2.variance}, Desv. Est.=${currentSolutions2.stdDev}`;
    }
}

function showSolution2() {
    if (!currentSolutions2) {
        console.error('No hay soluciones disponibles para mostrar');
        return;
    }
    
    document.getElementById('mean-2').value = currentSolutions2.mean;
    document.getElementById('median-2').value = currentSolutions2.median;
    document.getElementById('mode-2').value = currentSolutions2.mode;
    document.getElementById('range-2').value = currentSolutions2.range;
    document.getElementById('variance-2').value = currentSolutions2.variance;
    document.getElementById('stddev-2').value = currentSolutions2.stdDev;
    
    const resultDiv = document.getElementById('result-2');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        Media (x̄) = ${currentSolutions2.mean}<br>
        Mediana = ${currentSolutions2.median}<br>
        Moda = ${currentSolutions2.mode}<br>
        Rango = ${currentSolutions2.range}<br>
        Varianza (σ²) = ${currentSolutions2.variance}<br>
        Desviación Estándar (σ) = ${currentSolutions2.stdDev}`;
}

function resetExercise2() {
    // Cargar un nuevo ejercicio aleatorio
    loadRandomExercise2();
}

// ========== EJERCICIO 3: PROBABILIDAD BÁSICA ==========
// Datos de ejercicios embebidos como respaldo (se cargarán desde JSON)
// Nota: Si el JSON no se carga, se usarán estos ejercicios. Se recomienda cargar desde JSON para tener los 10 ejercicios.
const defaultExercisesUnit3 = [
  {
    "id": 1,
    "title": "Lanzamiento de Dado",
    "description": "Se lanza un dado de 6 caras",
    "sampleSpace": "Ω = {1, 2, 3, 4, 5, 6}",
    "sampleSpaceOptions": [
      "Ω = {1, 2, 3, 4, 5}",
      "Ω = {1, 2, 3, 4, 5, 6}",
      "Ω = {cara, sello}"
    ],
    "samplePoints": 6,
    "questions": [
      {
        "label": "El evento \"obtener un número par\" es:",
        "correct": "Evento aleatorio",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      },
      {
        "label": "El evento \"obtener un 7\" es:",
        "correct": "Evento imposible",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      },
      {
        "label": "El evento \"obtener un número entre 1 y 6\" es:",
        "correct": "Evento seguro",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      }
    ]
  },
  {
    "id": 2,
    "title": "Lanzamiento de Moneda",
    "description": "Se lanza una moneda",
    "sampleSpace": "Ω = {cara, sello}",
    "sampleSpaceOptions": [
      "Ω = {1, 2, 3, 4, 5, 6}",
      "Ω = {cara, sello}",
      "Ω = {cara}"
    ],
    "samplePoints": 2,
    "questions": [
      {
        "label": "El evento \"obtener cara\" es:",
        "correct": "Evento aleatorio",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      },
      {
        "label": "El evento \"obtener un número\" es:",
        "correct": "Evento imposible",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      },
      {
        "label": "El evento \"obtener cara o sello\" es:",
        "correct": "Evento seguro",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      }
    ]
  },
  {
    "id": 3,
    "title": "Extracción de Carta",
    "description": "Se extrae una carta de una baraja española (40 cartas: 1-7 y figuras por palo)",
    "sampleSpace": "Ω = {40 cartas diferentes}",
    "sampleSpaceOptions": [
      "Ω = {1, 2, 3, 4, 5, 6}",
      "Ω = {40 cartas diferentes}",
      "Ω = {cara, sello}"
    ],
    "samplePoints": 40,
    "questions": [
      {
        "label": "El evento \"obtener un as\" es:",
        "correct": "Evento aleatorio",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      },
      {
        "label": "El evento \"obtener un 10\" es:",
        "correct": "Evento imposible",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      },
      {
        "label": "El evento \"obtener una carta de la baraja\" es:",
        "correct": "Evento seguro",
        "options": ["Evento aleatorio", "Evento imposible", "Evento seguro"]
      }
    ]
  }
];

let exercisesUnit3 = [];
let currentExercise3 = null;

// Cargar ejercicios desde JSON
async function loadExercises3() {
    // Intentar diferentes rutas posibles
    const possiblePaths = [
        'exercises-unit3.json',
        './exercises-unit3.json',
        'estadistica/exercises-unit3.json',
        './estadistica/exercises-unit3.json'
    ];
    
    let loaded = false;
    
    for (const path of possiblePaths) {
        try {
            console.log(`Intentando cargar ejercicios unidad 3 desde: ${path}`);
            const response = await fetch(path);
            
            if (!response.ok) {
                console.warn(`Respuesta no OK para ${path}: ${response.status} ${response.statusText}`);
                continue;
            }
            
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0) {
                exercisesUnit3 = data;
                console.log(`✅ Ejercicios unidad 3 cargados exitosamente desde: ${path} (${data.length} ejercicios)`);
                loaded = true;
                // Cargar un ejercicio aleatorio al inicio
                loadRandomExercise3();
                break;
            } else {
                console.warn(`Datos inválidos desde ${path}: no es un array o está vacío`);
            }
        } catch (error) {
            console.warn(`Error al cargar desde ${path}:`, error.message);
            continue;
        }
    }
    
    // Si no se pudo cargar desde ningún archivo, usar datos embebidos
    if (!loaded) {
        console.warn('⚠️ No se pudo cargar el archivo JSON unidad 3, usando datos embebidos');
        exercisesUnit3 = defaultExercisesUnit3;
        console.log(`✅ Usando ${exercisesUnit3.length} ejercicios embebidos unidad 3`);
        loadRandomExercise3();
    }
}

// Cargar un ejercicio aleatorio
function loadRandomExercise3() {
    if (exercisesUnit3.length === 0) {
        console.warn('No hay ejercicios disponibles para la unidad 3');
        return;
    }
    
    // Si solo hay un ejercicio, usarlo directamente
    if (exercisesUnit3.length === 1) {
        currentExercise3 = exercisesUnit3[0];
        console.log(`⚠️ Solo hay 1 ejercicio disponible: ${currentExercise3.title}`);
        setTimeout(() => {
            updateExercise3UI();
        }, 50);
        return;
    }
    
    // Guardar el ID del ejercicio actual antes de seleccionar uno nuevo
    const previousExerciseId = currentExercise3 ? currentExercise3.id : null;
    console.log(`📋 Ejercicio anterior: ID ${previousExerciseId}`);
    
    // Filtrar ejercicios disponibles (excluir el actual si existe)
    let availableExercises = exercisesUnit3;
    if (previousExerciseId !== null) {
        availableExercises = exercisesUnit3.filter(ex => {
            const isDifferent = ex.id !== previousExerciseId;
            if (!isDifferent) {
                console.log(`🚫 Excluyendo ejercicio ID ${ex.id}: ${ex.title}`);
            }
            return isDifferent;
        });
    }
    
    // Si después del filtrado no quedan ejercicios, usar todos (no debería pasar)
    if (availableExercises.length === 0) {
        console.warn('⚠️ No hay ejercicios disponibles después del filtrado, usando todos');
        availableExercises = exercisesUnit3;
    }
    
    console.log(`📊 Total de ejercicios: ${exercisesUnit3.length}, Ejercicios disponibles: ${availableExercises.length}`);
    console.log(`📝 IDs disponibles: [${availableExercises.map(ex => ex.id).join(', ')}]`);
    
    // Seleccionar un ejercicio aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    const selectedExercise = availableExercises[randomIndex];
    
    // Verificación adicional: asegurarse de que sea diferente
    if (selectedExercise.id === previousExerciseId) {
        console.error('❌ ERROR: Se seleccionó el mismo ejercicio! Seleccionando otro...');
        // Si por alguna razón se seleccionó el mismo, elegir otro
        const remainingExercises = availableExercises.filter(ex => ex.id !== previousExerciseId);
        if (remainingExercises.length > 0) {
            const newIndex = Math.floor(Math.random() * remainingExercises.length);
            currentExercise3 = remainingExercises[newIndex];
            console.log(`✅ Ejercicio corregido: ${currentExercise3.title} (ID: ${currentExercise3.id})`);
        } else {
            // Si no hay otros, usar el seleccionado (solo debería pasar si hay 1 ejercicio)
            currentExercise3 = selectedExercise;
        }
    } else {
        currentExercise3 = selectedExercise;
    }
    
    console.log(`🔄 Cargando nuevo ejercicio unidad 3: ${currentExercise3.title} (ID: ${currentExercise3.id})`);
    
    // Actualizar la interfaz con un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
        updateExercise3UI();
    }, 50);
}

// Actualizar la interfaz del ejercicio
function updateExercise3UI() {
    if (!currentExercise3) {
        console.error('No hay ejercicio actual unidad 3 para mostrar');
        return;
    }
    
    // Verificar que los elementos del DOM existan
    const titleEl = document.getElementById('exercise3-title');
    const descEl = document.getElementById('exercise3-description');
    const questionsContainer = document.getElementById('exercise3-questions');
    
    if (!titleEl || !descEl || !questionsContainer) {
        console.error('Elementos del DOM unidad 3 no encontrados. Esperando a que se cargue la unidad 3...');
        // Reintentar después de un breve delay
        setTimeout(() => {
            if (currentExercise3) {
                updateExercise3UI();
            }
        }, 500);
        return;
    }
    
    // Limpiar resultado primero
    const resultEl = document.getElementById('result-3');
    if (resultEl) {
        resultEl.className = 'result-message';
        resultEl.textContent = '';
    }
    
    // Actualizar título y descripción
    titleEl.textContent = `Ejercicio: ${currentExercise3.title}`;
    descEl.innerHTML = `<strong>${currentExercise3.description}. Responde las siguientes preguntas:</strong>`;
    
    // Limpiar completamente el contenedor de preguntas
    questionsContainer.innerHTML = '';
    
    // Pregunta 1: Espacio muestral
    const q1Group = document.createElement('div');
    q1Group.className = 'question-group';
    q1Group.innerHTML = `
        <label>1. ¿Cuál es el espacio muestral?</label>
        <select id="q3-1">
            <option value="">Selecciona una opción</option>
            ${currentExercise3.sampleSpaceOptions.map((option, index) => {
                const isCorrect = option === currentExercise3.sampleSpace;
                return `<option value="${isCorrect ? 'correct' : 'wrong'}">${option}</option>`;
            }).join('')}
        </select>
    `;
    questionsContainer.appendChild(q1Group);
    
    // Pregunta 2: Puntos muestrales
    const q2Group = document.createElement('div');
    q2Group.className = 'question-group';
    q2Group.innerHTML = `
        <label>2. ¿Cuántos puntos muestrales tiene este experimento?</label>
        <input type="number" id="q3-2" placeholder="Número" value="">
    `;
    questionsContainer.appendChild(q2Group);
    
    // Preguntas 3, 4, 5: Tipos de eventos
    currentExercise3.questions.forEach((question, index) => {
        const qGroup = document.createElement('div');
        qGroup.className = 'question-group';
        qGroup.innerHTML = `
            <label>${index + 3}. ${question.label}</label>
            <select id="q3-${index + 3}">
                <option value="">Selecciona una opción</option>
                ${question.options.map(option => {
                    const isCorrect = option === question.correct;
                    return `<option value="${isCorrect ? 'correct' : 'wrong'}">${option}</option>`;
                }).join('')}
            </select>
        `;
        questionsContainer.appendChild(qGroup);
    });
    
    console.log(`✅ Interfaz actualizada para ejercicio unidad 3: ${currentExercise3.title}`);
}

// Verificar respuesta
function checkExercise3() {
    if (!currentExercise3) {
        console.error('No hay ejercicio actual para verificar');
        return;
    }
    
    const q1 = document.getElementById('q3-1')?.value;
    const q2 = parseInt(document.getElementById('q3-2')?.value);
    const q3 = document.getElementById('q3-3')?.value;
    const q4 = document.getElementById('q3-4')?.value;
    const q5 = document.getElementById('q3-5')?.value;
    
    const resultDiv = document.getElementById('result-3');
    
    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        resultDiv.className = 'result-message error show';
        resultDiv.textContent = 'Por favor responde todas las preguntas.';
        return;
    }
    
    const correct = q1 === 'correct' && 
                    q2 === currentExercise3.samplePoints && 
                    q3 === 'correct' && 
                    q4 === 'correct' && 
                    q5 === 'correct';
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Perfecto! Todas las respuestas son correctas.';
    } else {
        let errors = [];
        if (q1 !== 'correct') errors.push(`Pregunta 1: El espacio muestral es ${currentExercise3.sampleSpace}`);
        if (q2 !== currentExercise3.samplePoints) errors.push(`Pregunta 2: Hay ${currentExercise3.samplePoints} puntos muestrales`);
        if (q3 !== 'correct') errors.push(`Pregunta 3: ${currentExercise3.questions[0].label} - Respuesta: ${currentExercise3.questions[0].correct}`);
        if (q4 !== 'correct') errors.push(`Pregunta 4: ${currentExercise3.questions[1].label} - Respuesta: ${currentExercise3.questions[1].correct}`);
        if (q5 !== 'correct') errors.push(`Pregunta 5: ${currentExercise3.questions[2].label} - Respuesta: ${currentExercise3.questions[2].correct}`);
        
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = 'Algunas respuestas son incorrectas:<br>' + errors.join('<br>');
    }
}

// Mostrar solución
function showSolution3() {
    if (!currentExercise3) {
        console.error('No hay ejercicio actual para mostrar solución');
        return;
    }
    
    // Llenar respuestas correctas
    document.getElementById('q3-1').value = 'correct';
    document.getElementById('q3-2').value = currentExercise3.samplePoints;
    document.getElementById('q3-3').value = 'correct';
    document.getElementById('q3-4').value = 'correct';
    document.getElementById('q3-5').value = 'correct';
    
    const resultDiv = document.getElementById('result-3');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        1. Espacio muestral: ${currentExercise3.sampleSpace}<br>
        2. Puntos muestrales: ${currentExercise3.samplePoints}<br>
        3. ${currentExercise3.questions[0].label}<br>
           Respuesta: ${currentExercise3.questions[0].correct}<br>
        4. ${currentExercise3.questions[1].label}<br>
           Respuesta: ${currentExercise3.questions[1].correct}<br>
        5. ${currentExercise3.questions[2].label}<br>
           Respuesta: ${currentExercise3.questions[2].correct}`;
}

// Reiniciar ejercicio (cargar uno nuevo aleatorio)
function resetExercise3() {
    // Limpiar resultado antes de cargar nuevo ejercicio
    const resultEl = document.getElementById('result-3');
    if (resultEl) {
        resultEl.className = 'result-message';
        resultEl.textContent = '';
    }
    
    // Cargar un nuevo ejercicio aleatorio
    loadRandomExercise3();
}

// ========== EJERCICIO 4: SUCESOS DEPENDIENTES E INDEPENDIENTES ==========
// Datos de ejercicios embebidos como respaldo
const defaultExercisesUnit4 = [
  {
    "id": 1,
    "title": "Urna con Bolas Rojas, Azules y Verdes",
    "description": "En una urna hay 5 bolas rojas, 3 bolas azules y 2 bolas verdes. Se extraen 2 bolas.",
    "totalBalls": 10,
    "redBalls": 5,
    "blueBalls": 3,
    "greenBalls": 2,
    "colorName": "Roja"
  },
  {
    "id": 2,
    "title": "Urna con Bolas Rojas y Azules",
    "description": "En una urna hay 6 bolas rojas y 4 bolas azules. Se extraen 2 bolas.",
    "totalBalls": 10,
    "redBalls": 6,
    "blueBalls": 4,
    "greenBalls": 0,
    "colorName": "Roja"
  },
  {
    "id": 3,
    "title": "Urna con Bolas Rojas, Verdes y Amarillas",
    "description": "En una urna hay 4 bolas rojas, 3 bolas verdes y 3 bolas amarillas. Se extraen 2 bolas.",
    "totalBalls": 10,
    "redBalls": 4,
    "blueBalls": 0,
    "greenBalls": 3,
    "yellowBalls": 3,
    "colorName": "Roja"
  }
];

let exercisesUnit4 = [];
let currentExercise4 = null;
let currentSolutions4 = null;

// Cargar ejercicios desde JSON
async function loadExercises4() {
    // Intentar diferentes rutas posibles
    const possiblePaths = [
        'exercises-unit4.json',
        './exercises-unit4.json',
        'estadistica/exercises-unit4.json',
        './estadistica/exercises-unit4.json'
    ];
    
    let loaded = false;
    
    for (const path of possiblePaths) {
        try {
            console.log(`Intentando cargar ejercicios unidad 4 desde: ${path}`);
            const response = await fetch(path);
            
            if (!response.ok) {
                console.warn(`Respuesta no OK para ${path}: ${response.status} ${response.statusText}`);
                continue;
            }
            
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0) {
                exercisesUnit4 = data;
                console.log(`✅ Ejercicios unidad 4 cargados exitosamente desde: ${path} (${data.length} ejercicios)`);
                loaded = true;
                // Cargar un ejercicio aleatorio al inicio
                loadRandomExercise4();
                break;
            } else {
                console.warn(`Datos inválidos desde ${path}: no es un array o está vacío`);
            }
        } catch (error) {
            console.warn(`Error al cargar desde ${path}:`, error.message);
            continue;
        }
    }
    
    // Si no se pudo cargar desde ningún archivo, usar datos embebidos
    if (!loaded) {
        console.warn('⚠️ No se pudo cargar el archivo JSON unidad 4, usando datos embebidos');
        exercisesUnit4 = defaultExercisesUnit4;
        console.log(`✅ Usando ${exercisesUnit4.length} ejercicios embebidos unidad 4`);
        loadRandomExercise4();
    }
}

// Calcular probabilidades para un ejercicio
function calculateProbabilities4(exercise) {
    const totalBalls = exercise.totalBalls;
    // Obtener el número de bolas del color principal según el colorName
    let colorBalls;
    switch(exercise.colorName.toLowerCase()) {
        case 'roja':
            colorBalls = exercise.redBalls || 0;
            break;
        case 'azul':
            colorBalls = exercise.blueBalls || 0;
            break;
        case 'verde':
            colorBalls = exercise.greenBalls || 0;
            break;
        case 'amarilla':
            colorBalls = exercise.yellowBalls || 0;
            break;
        case 'negra':
            colorBalls = exercise.blackBalls || 0;
            break;
        case 'blanca':
            colorBalls = exercise.whiteBalls || 0;
            break;
        default:
            colorBalls = exercise.redBalls || 0;
    }
    
    // P(Color en primera)
    const probColor = colorBalls / totalBalls;
    
    // Con reemplazo (Independientes): P(Color en segunda | Color en primera) = colorBalls / totalBalls
    const probColorCondIndep = colorBalls / totalBalls;
    
    // Sin reemplazo (Dependientes): P(Color en segunda | Color en primera) = (colorBalls - 1) / (totalBalls - 1)
    const probColorCondDep = (colorBalls - 1) / (totalBalls - 1);
    
    // Con reemplazo: P(Color y Color) = probColor × probColorCondIndep
    const probColorColorIndep = probColor * probColorCondIndep;
    
    // Sin reemplazo: P(Color y Color) = probColor × probColorCondDep
    const probColorColorDep = probColor * probColorCondDep;
    
    return {
        probColor: probColor,
        probColorCondIndep: probColorCondIndep,
        probColorCondDep: probColorCondDep,
        probColorColorIndep: probColorColorIndep,
        probColorColorDep: probColorColorDep,
        colorBalls: colorBalls,
        totalBalls: totalBalls
    };
}

// Cargar un ejercicio aleatorio
function loadRandomExercise4() {
    if (exercisesUnit4.length === 0) {
        console.warn('No hay ejercicios disponibles para la unidad 4');
        return;
    }
    
    // Si solo hay un ejercicio, usarlo directamente
    if (exercisesUnit4.length === 1) {
        currentExercise4 = exercisesUnit4[0];
        console.log(`⚠️ Solo hay 1 ejercicio disponible: ${currentExercise4.title}`);
        currentSolutions4 = calculateProbabilities4(currentExercise4);
        setTimeout(() => {
            updateExercise4UI();
        }, 50);
        return;
    }
    
    // Guardar el ID del ejercicio actual antes de seleccionar uno nuevo
    const previousExerciseId = currentExercise4 ? currentExercise4.id : null;
    console.log(`📋 Ejercicio anterior: ID ${previousExerciseId}`);
    
    // Filtrar ejercicios disponibles (excluir el actual si existe)
    let availableExercises = exercisesUnit4;
    if (previousExerciseId !== null) {
        availableExercises = exercisesUnit4.filter(ex => {
            const isDifferent = ex.id !== previousExerciseId;
            if (!isDifferent) {
                console.log(`🚫 Excluyendo ejercicio ID ${ex.id}: ${ex.title}`);
            }
            return isDifferent;
        });
    }
    
    // Si después del filtrado no quedan ejercicios, usar todos (no debería pasar)
    if (availableExercises.length === 0) {
        console.warn('⚠️ No hay ejercicios disponibles después del filtrado, usando todos');
        availableExercises = exercisesUnit4;
    }
    
    console.log(`📊 Total de ejercicios: ${exercisesUnit4.length}, Ejercicios disponibles: ${availableExercises.length}`);
    console.log(`📝 IDs disponibles: [${availableExercises.map(ex => ex.id).join(', ')}]`);
    
    // Seleccionar un ejercicio aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    const selectedExercise = availableExercises[randomIndex];
    
    // Verificación adicional: asegurarse de que sea diferente
    if (selectedExercise.id === previousExerciseId) {
        console.error('❌ ERROR: Se seleccionó el mismo ejercicio! Seleccionando otro...');
        const remainingExercises = availableExercises.filter(ex => ex.id !== previousExerciseId);
        if (remainingExercises.length > 0) {
            const newIndex = Math.floor(Math.random() * remainingExercises.length);
            currentExercise4 = remainingExercises[newIndex];
            console.log(`✅ Ejercicio corregido: ${currentExercise4.title} (ID: ${currentExercise4.id})`);
        } else {
            currentExercise4 = selectedExercise;
        }
    } else {
        currentExercise4 = selectedExercise;
    }
    
    // Calcular soluciones
    currentSolutions4 = calculateProbabilities4(currentExercise4);
    
    console.log(`🔄 Cargando nuevo ejercicio unidad 4: ${currentExercise4.title} (ID: ${currentExercise4.id})`);
    
    // Actualizar la interfaz con un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
        updateExercise4UI();
    }, 50);
}

// Actualizar la interfaz del ejercicio
function updateExercise4UI() {
    if (!currentExercise4 || !currentSolutions4) {
        console.error('No hay ejercicio actual unidad 4 para mostrar');
        return;
    }
    
    // Verificar que los elementos del DOM existan
    const titleEl = document.getElementById('exercise4-title');
    const descEl = document.getElementById('exercise4-description');
    const labelProbR = document.getElementById('label-prob-r');
    const labelProbRCondIndep = document.getElementById('label-prob-r-cond-indep');
    const labelProbRCondDep = document.getElementById('label-prob-r-cond-dep');
    const labelProbRRIndep = document.getElementById('label-prob-rr-indep');
    const labelProbRRDep = document.getElementById('label-prob-rr-dep');
    
    if (!titleEl || !descEl) {
        console.error('Elementos del DOM unidad 4 no encontrados. Esperando a que se cargue la unidad 4...');
        setTimeout(() => {
            if (currentExercise4) {
                updateExercise4UI();
            }
        }, 500);
        return;
    }
    
    // Limpiar resultado primero
    const resultEl = document.getElementById('result-4');
    if (resultEl) {
        resultEl.className = 'result-message';
        resultEl.textContent = '';
    }
    
    // Actualizar título y descripción
    titleEl.textContent = `Ejercicio: ${currentExercise4.title}`;
    descEl.innerHTML = `<strong>${currentExercise4.description}</strong>`;
    
    // Actualizar labels con el color correcto
    const colorName = currentExercise4.colorName;
    if (labelProbR) labelProbR.textContent = `P(${colorName} en primera extracción):`;
    if (labelProbRCondIndep) labelProbRCondIndep.textContent = `P(${colorName} en segunda | ${colorName} en primera) - Con reemplazo (Independientes):`;
    if (labelProbRCondDep) labelProbRCondDep.textContent = `P(${colorName} en segunda | ${colorName} en primera) - Sin reemplazo (Dependientes):`;
    if (labelProbRRIndep) labelProbRRIndep.textContent = `P(${colorName} y ${colorName}) - Con reemplazo (Independientes):`;
    if (labelProbRRDep) labelProbRRDep.textContent = `P(${colorName} y ${colorName}) - Sin reemplazo (Dependientes):`;
    
    // Limpiar campos de entrada
    ['prob-r', 'prob-r-cond-indep', 'prob-r-cond-dep', 'prob-rr-indep', 'prob-rr-dep'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });
    
    console.log(`✅ Interfaz actualizada para ejercicio unidad 4: ${currentExercise4.title}`);
}

function parseProbability(value) {
    if (!value) return null;
    // Intentar fracción (ej: "5/10", "1/2")
    const fractionMatch = value.match(/(\d+)\/(\d+)/);
    if (fractionMatch) {
        return parseFloat(fractionMatch[1]) / parseFloat(fractionMatch[2]);
    }
    // Intentar decimal
    return parseFloat(value);
}

function checkExercise4() {
    if (!currentSolutions4 || !currentExercise4) {
        console.error('No hay soluciones disponibles para verificar');
        return;
    }
    
    const probRInput = parseProbability(document.getElementById('prob-r').value);
    const probRCondIndepInput = parseProbability(document.getElementById('prob-r-cond-indep').value);
    const probRCondDepInput = parseProbability(document.getElementById('prob-r-cond-dep').value);
    const probRRIndepInput = parseProbability(document.getElementById('prob-rr-indep').value);
    const probRRDepInput = parseProbability(document.getElementById('prob-rr-dep').value);
    
    const resultDiv = document.getElementById('result-4');
    
    if (probRInput === null || probRCondIndepInput === null || probRCondDepInput === null || 
        probRRIndepInput === null || probRRDepInput === null) {
        resultDiv.className = 'result-message error show';
        resultDiv.textContent = 'Por favor completa todos los campos. Puedes usar fracciones (5/10) o decimales (0.5).';
        return;
    }
    
    const tolerance = 0.01;
    const correct = Math.abs(probRInput - currentSolutions4.probColor) < tolerance &&
                    Math.abs(probRCondIndepInput - currentSolutions4.probColorCondIndep) < tolerance &&
                    Math.abs(probRCondDepInput - currentSolutions4.probColorCondDep) < tolerance &&
                    Math.abs(probRRIndepInput - currentSolutions4.probColorColorIndep) < tolerance &&
                    Math.abs(probRRDepInput - currentSolutions4.probColorColorDep) < tolerance;
    
    const colorName = currentExercise4.colorName;
    const colorBalls = currentSolutions4.colorBalls;
    const totalBalls = currentSolutions4.totalBalls;
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Excelente! Todas las probabilidades son correctas. Has comprendido la diferencia entre sucesos dependientes e independientes.';
    } else {
        // Calcular fracciones simplificadas para mostrar
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const simplifyFraction = (num, den) => {
            const divisor = gcd(num, den);
            return `${num / divisor}/${den / divisor}`;
        };
        
        const fracR = simplifyFraction(colorBalls, totalBalls);
        const fracCondDep = simplifyFraction(colorBalls - 1, totalBalls - 1);
        const fracRRIndep = simplifyFraction(colorBalls * colorBalls, totalBalls * totalBalls);
        const fracRRDep = simplifyFraction(colorBalls * (colorBalls - 1), totalBalls * (totalBalls - 1));
        
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = `Algunas respuestas son incorrectas.<br>
            Respuestas correctas:<br>
            P(${colorName} en primera) = ${currentSolutions4.probColor.toFixed(3)} o ${fracR}<br>
            P(${colorName} en segunda | ${colorName} en primera) con reemplazo = ${currentSolutions4.probColorCondIndep.toFixed(3)} o ${fracR} (Independientes)<br>
            P(${colorName} en segunda | ${colorName} en primera) sin reemplazo = ${currentSolutions4.probColorCondDep.toFixed(3)} o ${fracCondDep} (Dependientes)<br>
            P(${colorName} y ${colorName}) con reemplazo = ${currentSolutions4.probColorColorIndep.toFixed(3)} o ${fracRRIndep} (Independientes)<br>
            P(${colorName} y ${colorName}) sin reemplazo = ${currentSolutions4.probColorColorDep.toFixed(3)} o ${fracRRDep} (Dependientes)`;
    }
}

function showSolution4() {
    if (!currentSolutions4 || !currentExercise4) {
        console.error('No hay soluciones disponibles para mostrar');
        return;
    }
    
    const colorName = currentExercise4.colorName;
    const colorBalls = currentSolutions4.colorBalls;
    const totalBalls = currentSolutions4.totalBalls;
    
    // Calcular fracciones simplificadas
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const simplifyFraction = (num, den) => {
        const divisor = gcd(num, den);
        return `${num / divisor}/${den / divisor}`;
    };
    
    const fracR = simplifyFraction(colorBalls, totalBalls);
    const fracCondDep = simplifyFraction(colorBalls - 1, totalBalls - 1);
    const fracRRIndep = simplifyFraction(colorBalls * colorBalls, totalBalls * totalBalls);
    const fracRRDep = simplifyFraction(colorBalls * (colorBalls - 1), totalBalls * (totalBalls - 1));
    
    // Llenar valores
    document.getElementById('prob-r').value = fracR;
    document.getElementById('prob-r-cond-indep').value = fracR;
    document.getElementById('prob-r-cond-dep').value = fracCondDep;
    document.getElementById('prob-rr-indep').value = currentSolutions4.probColorColorIndep.toFixed(3);
    document.getElementById('prob-rr-dep').value = currentSolutions4.probColorColorDep.toFixed(3);
    
    const resultDiv = document.getElementById('result-4');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        <strong>Sucesos Independientes (con reemplazo):</strong><br>
        P(${colorName} en primera) = ${fracR} = ${currentSolutions4.probColor.toFixed(3)}<br>
        P(${colorName} en segunda | ${colorName} en primera) = ${fracR} = ${currentSolutions4.probColorCondIndep.toFixed(3)} (no cambia porque hay reemplazo)<br>
        P(${colorName} y ${colorName}) = P(${colorName}₁) × P(${colorName}₂) = ${currentSolutions4.probColor.toFixed(3)} × ${currentSolutions4.probColorCondIndep.toFixed(3)} = ${currentSolutions4.probColorColorIndep.toFixed(3)}<br><br>
        <strong>Sucesos Dependientes (sin reemplazo):</strong><br>
        P(${colorName} en primera) = ${fracR} = ${currentSolutions4.probColor.toFixed(3)}<br>
        P(${colorName} en segunda | ${colorName} en primera) = ${fracCondDep} = ${currentSolutions4.probColorCondDep.toFixed(3)} (cambia porque ya se extrajo una ${colorName.toLowerCase()})<br>
        P(${colorName} y ${colorName}) = P(${colorName}₁) × P(${colorName}₂|${colorName}₁) = ${currentSolutions4.probColor.toFixed(3)} × ${currentSolutions4.probColorCondDep.toFixed(3)} = ${currentSolutions4.probColorColorDep.toFixed(3)}`;
}

function resetExercise4() {
    // Limpiar resultado antes de cargar nuevo ejercicio
    const resultEl = document.getElementById('result-4');
    if (resultEl) {
        resultEl.className = 'result-message';
        resultEl.textContent = '';
    }
    
    // Cargar un nuevo ejercicio aleatorio
    loadRandomExercise4();
}

// Cerrar menú móvil al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('menu-toggle');
    
    if (nav && toggle && nav.classList.contains('mobile-active')) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = toggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle) {
            closeMobileMenu();
        }
    }
});

// Cerrar menú móvil al redimensionar la ventana (si se vuelve desktop)
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Inicializar: mostrar la página de inicio por defecto
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de Estadística cargada correctamente');
    // Mostrar la página de inicio por defecto
    showHome();
    // Cargar ejercicios de las unidades
    loadExercises1();
    loadExercises2();
    loadExercises3();
    loadExercises4();
});

