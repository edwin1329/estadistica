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
const dataUnit1 = [8, 7, 9, 6, 8, 7, 8, 9, 7, 6, 8, 9, 7, 8, 9, 6, 7, 8, 9, 8];
const frequenciesUnit1 = {6: 3, 7: 5, 8: 7, 9: 5};
const totalUnit1 = 20;

function calculateFrequencies1() {
    const f6 = parseInt(document.getElementById('f1-6').value) || 0;
    const f7 = parseInt(document.getElementById('f1-7').value) || 0;
    const f8 = parseInt(document.getElementById('f1-8').value) || 0;
    const f9 = parseInt(document.getElementById('f1-9').value) || 0;
    
    // Calcular frecuencias relativas y acumuladas
    const fr6 = (f6 / totalUnit1).toFixed(3);
    const fr7 = (f7 / totalUnit1).toFixed(3);
    const fr8 = (f8 / totalUnit1).toFixed(3);
    const fr9 = (f9 / totalUnit1).toFixed(3);
    
    const fa6 = f6;
    const fa7 = f6 + f7;
    const fa8 = f6 + f7 + f8;
    const fa9 = f6 + f7 + f8 + f9;
    
    document.getElementById('fr1-6').textContent = fr6;
    document.getElementById('fr1-7').textContent = fr7;
    document.getElementById('fr1-8').textContent = fr8;
    document.getElementById('fr1-9').textContent = fr9;
    
    document.getElementById('fa1-6').textContent = fa6;
    document.getElementById('fa1-7').textContent = fa7;
    document.getElementById('fa1-8').textContent = fa8;
    document.getElementById('fa1-9').textContent = fa9;
}

// Event listeners para calcular automáticamente
document.addEventListener('DOMContentLoaded', function() {
    ['f1-6', 'f1-7', 'f1-8', 'f1-9'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateFrequencies1);
        }
    });
});

function checkExercise1() {
    const f6 = parseInt(document.getElementById('f1-6').value);
    const f7 = parseInt(document.getElementById('f1-7').value);
    const f8 = parseInt(document.getElementById('f1-8').value);
    const f9 = parseInt(document.getElementById('f1-9').value);
    
    const resultDiv = document.getElementById('result-1');
    
    if (!f6 || !f7 || !f8 || !f9) {
        resultDiv.className = 'result-message error show';
        resultDiv.textContent = 'Por favor completa todos los campos de frecuencia.';
        return;
    }
    
    const correct = f6 === frequenciesUnit1[6] && f7 === frequenciesUnit1[7] && 
                    f8 === frequenciesUnit1[8] && f9 === frequenciesUnit1[9];
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Correcto! Has completado la tabla de frecuencias correctamente.';
    } else {
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = `Incorrecto. Revisa tus respuestas.<br>
            Frecuencias correctas: 6→${frequenciesUnit1[6]}, 7→${frequenciesUnit1[7]}, 8→${frequenciesUnit1[8]}, 9→${frequenciesUnit1[9]}`;
    }
}

function showSolution1() {
    document.getElementById('f1-6').value = frequenciesUnit1[6];
    document.getElementById('f1-7').value = frequenciesUnit1[7];
    document.getElementById('f1-8').value = frequenciesUnit1[8];
    document.getElementById('f1-9').value = frequenciesUnit1[9];
    calculateFrequencies1();
    
    const resultDiv = document.getElementById('result-1');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        Frecuencias: 6→${frequenciesUnit1[6]}, 7→${frequenciesUnit1[7]}, 8→${frequenciesUnit1[8]}, 9→${frequenciesUnit1[9]}<br>
        Frecuencias relativas: 6→${(frequenciesUnit1[6]/totalUnit1).toFixed(3)}, 7→${(frequenciesUnit1[7]/totalUnit1).toFixed(3)}, 8→${(frequenciesUnit1[8]/totalUnit1).toFixed(3)}, 9→${(frequenciesUnit1[9]/totalUnit1).toFixed(3)}`;
}

function resetExercise1() {
    document.getElementById('f1-6').value = '';
    document.getElementById('f1-7').value = '';
    document.getElementById('f1-8').value = '';
    document.getElementById('f1-9').value = '';
    ['fr1-6', 'fr1-7', 'fr1-8', 'fr1-9', 'fa1-6', 'fa1-7', 'fa1-8', 'fa1-9'].forEach(id => {
        document.getElementById(id).textContent = '-';
    });
    document.getElementById('result-1').className = 'result-message';
}

// ========== EJERCICIO 2: PARÁMETROS ESTADÍSTICOS ==========
const dataUnit2 = [12, 15, 18, 20, 22, 15, 18, 20, 15, 18];
const sortedData2 = [...dataUnit2].sort((a, b) => a - b);

function calculateStats2() {
    const n = dataUnit2.length;
    const mean = dataUnit2.reduce((a, b) => a + b, 0) / n;
    // Mediana: promedio de los dos valores centrales (índices 4 y 5 en array de 10 elementos)
    const median = (sortedData2[Math.floor((n-1)/2)] + sortedData2[Math.ceil((n-1)/2)]) / 2;
    
    // Moda
    const freq = {};
    dataUnit2.forEach(x => freq[x] = (freq[x] || 0) + 1);
    const mode = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
    
    const range = Math.max(...dataUnit2) - Math.min(...dataUnit2);
    
    // Varianza
    const variance = dataUnit2.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    return { mean: mean.toFixed(2), median: median.toFixed(2), mode: parseInt(mode), 
             range, variance: variance.toFixed(2), stdDev: stdDev.toFixed(2) };
}

const solutions2 = calculateStats2();

function checkExercise2() {
    const mean = parseFloat(document.getElementById('mean-2').value);
    const median = parseFloat(document.getElementById('median-2').value);
    const mode = parseInt(document.getElementById('mode-2').value);
    const range = parseInt(document.getElementById('range-2').value);
    const variance = parseFloat(document.getElementById('variance-2').value);
    const stdDev = parseFloat(document.getElementById('stddev-2').value);
    
    const resultDiv = document.getElementById('result-2');
    
    const correct = Math.abs(mean - parseFloat(solutions2.mean)) < 0.1 &&
                    Math.abs(median - parseFloat(solutions2.median)) < 0.1 &&
                    mode === solutions2.mode &&
                    range === solutions2.range &&
                    Math.abs(variance - parseFloat(solutions2.variance)) < 0.1 &&
                    Math.abs(stdDev - parseFloat(solutions2.stdDev)) < 0.1;
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Excelente! Todas las respuestas son correctas.';
    } else {
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = `Algunas respuestas son incorrectas. Revisa tus cálculos.<br>
            Respuestas correctas: Media=${solutions2.mean}, Mediana=${solutions2.median}, Moda=${solutions2.mode}, 
            Rango=${solutions2.range}, Varianza=${solutions2.variance}, Desv. Est.=${solutions2.stdDev}`;
    }
}

function showSolution2() {
    document.getElementById('mean-2').value = solutions2.mean;
    document.getElementById('median-2').value = solutions2.median;
    document.getElementById('mode-2').value = solutions2.mode;
    document.getElementById('range-2').value = solutions2.range;
    document.getElementById('variance-2').value = solutions2.variance;
    document.getElementById('stddev-2').value = solutions2.stdDev;
    
    const resultDiv = document.getElementById('result-2');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        Media = ${solutions2.mean}<br>
        Mediana = ${solutions2.median}<br>
        Moda = ${solutions2.mode}<br>
        Rango = ${solutions2.range}<br>
        Varianza = ${solutions2.variance}<br>
        Desviación Estándar = ${solutions2.stdDev}`;
}

function resetExercise2() {
    ['mean-2', 'median-2', 'mode-2', 'range-2', 'variance-2', 'stddev-2'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('result-2').className = 'result-message';
}

// ========== EJERCICIO 3: PROBABILIDAD BÁSICA ==========
function checkExercise3() {
    const q1 = document.getElementById('q3-1').value;
    const q2 = parseInt(document.getElementById('q3-2').value);
    const q3 = document.getElementById('q3-3').value;
    const q4 = document.getElementById('q3-4').value;
    const q5 = document.getElementById('q3-5').value;
    
    const resultDiv = document.getElementById('result-3');
    
    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        resultDiv.className = 'result-message error show';
        resultDiv.textContent = 'Por favor responde todas las preguntas.';
        return;
    }
    
    const correct = q1 === 'correct' && q2 === 6 && q3 === 'correct' && 
                    q4 === 'correct' && q5 === 'correct';
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Perfecto! Todas las respuestas son correctas.';
    } else {
        let errors = [];
        if (q1 !== 'correct') errors.push('Pregunta 1: El espacio muestral es {1, 2, 3, 4, 5, 6}');
        if (q2 !== 6) errors.push('Pregunta 2: Hay 6 puntos muestrales');
        if (q3 !== 'correct') errors.push('Pregunta 3: Es un evento aleatorio');
        if (q4 !== 'correct') errors.push('Pregunta 4: Es un evento imposible');
        if (q5 !== 'correct') errors.push('Pregunta 5: Es un evento seguro');
        
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = 'Algunas respuestas son incorrectas:<br>' + errors.join('<br>');
    }
}

function showSolution3() {
    document.getElementById('q3-1').value = 'correct';
    document.getElementById('q3-2').value = 6;
    document.getElementById('q3-3').value = 'correct';
    document.getElementById('q3-4').value = 'correct';
    document.getElementById('q3-5').value = 'correct';
    
    const resultDiv = document.getElementById('result-3');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        1. Espacio muestral: Ω = {1, 2, 3, 4, 5, 6}<br>
        2. Puntos muestrales: 6<br>
        3. Evento "número par": Evento aleatorio (puede ocurrir o no)<br>
        4. Evento "obtener 7": Evento imposible (no puede ocurrir)<br>
        5. Evento "número entre 1 y 6": Evento seguro (siempre ocurre)`;
}

function resetExercise3() {
    document.getElementById('q3-1').value = '';
    document.getElementById('q3-2').value = '';
    document.getElementById('q3-3').value = '';
    document.getElementById('q3-4').value = '';
    document.getElementById('q3-5').value = '';
    document.getElementById('result-3').className = 'result-message';
}

// ========== EJERCICIO 4: SUCESOS DEPENDIENTES E INDEPENDIENTES ==========
const totalBalls = 10; // 5 rojas + 3 azules + 2 verdes
const redBalls = 5;

// Probabilidades
const probR = redBalls / totalBalls; // P(Roja en primera) = 5/10
const probRCondIndep = redBalls / totalBalls; // Con reemplazo: P(Roja en segunda | Roja en primera) = 5/10 (independiente)
const probRCondDep = (redBalls - 1) / (totalBalls - 1); // Sin reemplazo: P(Roja en segunda | Roja en primera) = 4/9 (dependiente)
const probRRIndep = probR * probR; // Con reemplazo: P(Roja y Roja) = (5/10) × (5/10) = 0.25
const probRRDep = probR * probRCondDep; // Sin reemplazo: P(Roja y Roja) = (5/10) × (4/9) = 20/90 = 2/9

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
    const correct = Math.abs(probRInput - probR) < tolerance &&
                    Math.abs(probRCondIndepInput - probRCondIndep) < tolerance &&
                    Math.abs(probRCondDepInput - probRCondDep) < tolerance &&
                    Math.abs(probRRIndepInput - probRRIndep) < tolerance &&
                    Math.abs(probRRDepInput - probRRDep) < tolerance;
    
    if (correct) {
        resultDiv.className = 'result-message success show';
        resultDiv.textContent = '¡Excelente! Todas las probabilidades son correctas. Has comprendido la diferencia entre sucesos dependientes e independientes.';
    } else {
        resultDiv.className = 'result-message error show';
        resultDiv.innerHTML = `Algunas respuestas son incorrectas.<br>
            Respuestas correctas:<br>
            P(Roja en primera) = ${probR.toFixed(3)} o 5/10<br>
            P(Roja en segunda | Roja en primera) con reemplazo = ${probRCondIndep.toFixed(3)} o 5/10 (Independientes)<br>
            P(Roja en segunda | Roja en primera) sin reemplazo = ${probRCondDep.toFixed(3)} o 4/9 (Dependientes)<br>
            P(Roja y Roja) con reemplazo = ${probRRIndep.toFixed(3)} o 1/4 (Independientes)<br>
            P(Roja y Roja) sin reemplazo = ${probRRDep.toFixed(3)} o 2/9 (Dependientes)`;
    }
}

function showSolution4() {
    document.getElementById('prob-r').value = '5/10';
    document.getElementById('prob-r-cond-indep').value = '5/10';
    document.getElementById('prob-r-cond-dep').value = '4/9';
    document.getElementById('prob-rr-indep').value = probRRIndep.toFixed(3);
    document.getElementById('prob-rr-dep').value = probRRDep.toFixed(3);
    
    const resultDiv = document.getElementById('result-4');
    resultDiv.className = 'result-message info show';
    resultDiv.innerHTML = `<strong>Solución:</strong><br>
        <strong>Sucesos Independientes (con reemplazo):</strong><br>
        P(Roja en primera) = 5/10 = ${probR.toFixed(3)}<br>
        P(Roja en segunda | Roja en primera) = 5/10 = ${probRCondIndep.toFixed(3)} (no cambia porque hay reemplazo)<br>
        P(Roja y Roja) = P(R₁) × P(R₂) = ${probR.toFixed(3)} × ${probRCondIndep.toFixed(3)} = ${probRRIndep.toFixed(3)}<br><br>
        <strong>Sucesos Dependientes (sin reemplazo):</strong><br>
        P(Roja en primera) = 5/10 = ${probR.toFixed(3)}<br>
        P(Roja en segunda | Roja en primera) = 4/9 = ${probRCondDep.toFixed(3)} (cambia porque ya se extrajo una roja)<br>
        P(Roja y Roja) = P(R₁) × P(R₂|R₁) = ${probR.toFixed(3)} × ${probRCondDep.toFixed(3)} = ${probRRDep.toFixed(3)}`;
}

function resetExercise4() {
    ['prob-r', 'prob-r-cond-indep', 'prob-r-cond-dep', 'prob-rr-indep', 'prob-rr-dep'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('result-4').className = 'result-message';
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
});

