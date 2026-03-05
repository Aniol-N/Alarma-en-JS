import { Alarma } from "./Alarma.js";

let appState = {
    alarmas: new Map(),
    timeouts: new Map(),
    lema: "Gestor de Alarmas activo"
};

// ========== UTILIDADES ==========
function formatTime(value) {
    return String(value).padStart(2, '0');
}

function obtenerElementosPorId(...ids) {
    const elementos = {};
    ids.forEach(id => {
        elementos[id] = document.getElementById(id);
    });
    return elementos;
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', inicializarFormulario);

function inicializarFormulario() {
    const { alarmForm, alarmHourInput, alarmMinuteInput, alarmSecondInput } = obtenerElementosPorId(
        'alarmForm', 'alarmHourInput', 'alarmMinuteInput', 'alarmSecondInput'
    );

    agregarFormateoHora([alarmHourInput, alarmMinuteInput, alarmSecondInput]);
    alarmForm.addEventListener('submit', (event) => {
        event.preventDefault();
        establecerAlarma();
    });
}

function agregarFormateoHora(inputs) {
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            this.value = formatTime(this.value);
        });
    });
}

// ========== LÓGICA DE ALARMAS ==========
function obtenerValoresFormulario() {
    const { alarmTitleInput, alarmHourInput, alarmMinuteInput, alarmSecondInput, alarmActiveInput, audioSelectInput } = 
        obtenerElementosPorId('alarmTitleInput', 'alarmHourInput', 'alarmMinuteInput', 'alarmSecondInput', 'alarmActiveInput', 'audioSelectInput');
    
    return {
        titulo: alarmTitleInput.value,
        hora: formatTime(alarmHourInput.value),
        minuto: formatTime(alarmMinuteInput.value),
        segundo: formatTime(alarmSecondInput.value),
        activa: alarmActiveInput.checked,
        audio: audioSelectInput.value
    };
}

function verificarHoraRepetida(hora, minuto, segundo) {
    for (const alarma of appState.alarmas.values()) {
        if (alarma.hour === hora && alarma.minute === minuto && alarma.second === segundo) {
            return true;
        }
    }
    return false;
}

function calcularTiempoHastaAlarma(hora, minuto, segundo) {
    const ahora = new Date();
    const fechaAlarma = new Date();
    fechaAlarma.setHours(hora, minuto, segundo);
    
    if (fechaAlarma <= ahora) {
        fechaAlarma.setDate(fechaAlarma.getDate() + 1);
    }
    
    return fechaAlarma - ahora;
}

function establecerAlarma() {
    const { titulo, hora, minuto, segundo, activa, audio } = obtenerValoresFormulario();

    if (verificarHoraRepetida(hora, minuto, segundo)) {
        mostrarMensaje("Ya existe una alarma a esa hora", 'error');
        return;
    }

    const nuevaAlarma = new Alarma(titulo, hora, minuto, segundo, audio);
    appState.alarmas.set(nuevaAlarma.id, nuevaAlarma);

    const milisegundos = calcularTiempoHastaAlarma(hora, minuto, segundo);

    const id = setTimeout(() => {
        alert("¡Alarma! ⏰ Son las " + nuevaAlarma.time);
    }, milisegundos);

    appState.timeouts.set(nuevaAlarma.id, id);
    nuevaAlarma.active = activa;

    renderizarAlarmas();
    mostrarMensaje("Alarma añadida correctamente", 'success');
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById('alarmForm').reset();
}

function mostrarMensaje(mensaje, tipo = 'success') {
    const statusElement = document.getElementById('status');
    statusElement.innerText = mensaje;
    
    if (tipo === 'error') {
        statusElement.style.setProperty('color', '#dc3545', 'important'); 
    } else if (tipo === 'success') {
        statusElement.style.setProperty('color', '#28a745', 'important'); 
    }

    setInterval(() => {
        statusElement.innerText = "";
    }, 2000);
}
// ========== ELIMINACIÓN DE ALARMAS ==========
function cancelarTimeout(alarmaId) {
    const timeoutId = appState.timeouts.get(alarmaId);
    if (timeoutId) {
        clearTimeout(timeoutId);
        appState.timeouts.delete(alarmaId);
    }
}

function eliminarAlarmaDelEstado(alarmaId) {
    cancelarTimeout(alarmaId);
    appState.alarmas.delete(alarmaId);
}

window.borrarAlarma = function () {
    appState.timeouts.forEach(id => clearTimeout(id));
    appState.alarmas = new Map();
    appState.timeouts = new Map();
    renderizarAlarmas();
    mostrarMensaje("Todas las alarmas han sido borradas", 'success');
};

window.borrarAlarmaIndividual = function (alarmaId) {
    eliminarAlarmaDelEstado(alarmaId);
    renderizarAlarmas();
    mostrarMensaje("Alarma eliminada correctamente", 'success');
};

// ========== RENDERIZADO ==========
function renderizarAlarmas() {
    const contenedor = document.getElementById('displayAlarma');
    if (!contenedor) {
        console.error("ERROR: No se encontró el div 'displayAlarma' en el HTML.");
        return;
    }
    
    contenedor.innerHTML = "";
    appState.alarmas.forEach(alarm => {
        contenedor.innerHTML += alarm.makeHTML();
    });
}