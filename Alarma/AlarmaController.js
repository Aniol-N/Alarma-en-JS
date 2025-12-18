
let alarmTime = null;
let alarmTimeout = null;

document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const timeInput = document.getElementById('alarmTime').value;
    if (timeInput) {
        const now = new Date();
        const [hours, minutes] = timeInput.split(':').map(Number);
        alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

        if (alarmTime <= now) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }

        const timeToAlarm = alarmTime - now;
        alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
        document.getElementById('status').innerText = `Alarma establecida para las ${alarmTime.toLocaleTimeString()}`;
    }
});

document.getElementById('clearAlarmBtn').addEventListener('click', () => {
    clearTimeout(alarmTimeout);
    alarmTime = null;
    document.getElementById('status').innerText = 'Alarma borrada';
});

function triggerAlarm() {
    alert('¡Alarma! ⏰');
    document.getElementById('status').innerText = 'Alarma sonando!';
}