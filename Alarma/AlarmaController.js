import { Alarma } from "./Alarma.js";

// Objeto de estado estilo tu ejemplo
let appState = {
    alarmas: new Map(),
    timeouts: new Map(), // Lista para guardar los IDs de los temporizadores
    lema: "Gestor de Alarmas activo"
};

// Manejar envío del formulario
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('alarmForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        establecerAlarma();
    });
});

function establecerAlarma() {
    const titleInputElement = document.getElementById('alarmTitleInput');
    const hourInputElement = document.getElementById('alarmHourInput');
    const minuteInputElement = document.getElementById('alarmMinuteInput');
    const secondInputElement = document.getElementById('alarmSecondInput');

    const hora = hourInputElement.value;
    const minuto = minuteInputElement.value;
    const segundo = secondInputElement.value;

    const nuevaAlarma = new Alarma(titleInputElement.value, hora, minuto, segundo, "(hardcoded)alarm.mp3");
    appState.alarmas.set(nuevaAlarma.id, nuevaAlarma);

    const ahora = new Date();
    const fechaAlarma = new Date();
    fechaAlarma.setHours(hora, minuto, segundo);
    if (fechaAlarma <= ahora) {
        fechaAlarma.setDate(fechaAlarma.getDate() + 1);
    }

    const milisegundos = fechaAlarma - ahora;

    const id = setTimeout(() => {
        alert("¡Alarma! ⏰ Son las " + nuevaAlarma.getTime());
    }, milisegundos);

    appState.timeouts.set(nuevaAlarma.id, id);

    renderizarAlarmas();
    document.getElementById('status').innerText = "Alarma añadida correctamente";
    document.getElementById('alarmForm').reset();
}
// Borrar todas
window.borrarAlarma = function () {
    appState.timeouts.forEach(id => clearTimeout(id));
    appState.alarmas = new Map();
    appState.timeouts = new Map();
    renderizarAlarmas();
    document.getElementById('status').innerText = "Todas las alarmas han sido borradas";
};
// Borrar
window.borrarAlarmaIndividual = function (alarmaId) {
    const timeoutId = appState.timeouts.get(alarmaId);
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    appState.alarmas.delete(alarmaId);
    appState.timeouts.delete(alarmaId);
    renderizarAlarmas();
    document.getElementById('status').innerText = "Alarma eliminada correctamente";
};

// Mostrar
function renderizarAlarmas() {
    const contenedor = document.getElementById('displayAlarma');
    if (!contenedor) {
        console.error("ERROR: No se encontró el div 'displayAlarma' en el HTML.");
        return;
    }
    contenedor.innerHTML = "";
    // Recorrer el array de objetos y usar el método makeHTML de tu clase
    appState.alarmas.forEach(alarm => {
        contenedor.innerHTML += alarm.makeHTML();
    });
}