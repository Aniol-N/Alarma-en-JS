import { Alarma } from "./Alarma.js";

// Objeto de estado estilo tu ejemplo
let appState = {
    alarmas: [], // Lista para guardar los objetos Alarma
    timeouts: [], // Lista para guardar los IDs de los temporizadores
    lema: "Gestor de Alarmas activo"
};

// Función para el botón del HTML
window.establecerAlarma = function () {

    const inputElement = document.getElementById('alarmTimeInput');
    if (!inputElement || !inputElement.value) {
        return alert("Selecciona una hora primero");
    }
    const timeValue = inputElement.value;

    const [hora, minuto] = timeValue.split(':');
    const nuevaAlarma = new Alarma("Mi Alarma", hora, minuto, "00", "alarm.mp3");
    appState.alarmas.push(nuevaAlarma);

    const ahora = new Date();
    const fechaAlarma = new Date();
    fechaAlarma.setHours(hora, minuto, 0);
    if (fechaAlarma <= ahora) {
        fechaAlarma.setDate(fechaAlarma.getDate() + 1);
    }

    const milisegundos = fechaAlarma - ahora;

    const id = setTimeout(() => {
        alert("¡Alarma! ⏰ Son las " + nuevaAlarma.getTime());
    }, milisegundos);

    appState.timeouts.push(id);

    // 4. Mostrar en pantalla (Llamamos a una función que dibuja la lista)
    renderizarAlarmas();
    document.getElementById('status').innerText = "Alarma añadida correctamente";
};

window.borrarAlarma = function () {
    appState.timeouts.forEach(id => clearTimeout(id));
    appState.alarmas = [];
    appState.timeouts = [];
    renderizarAlarmas();
    document.getElementById('status').innerText = "Todas las alarmas han sido borradas";
};

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