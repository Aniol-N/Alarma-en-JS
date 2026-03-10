export class Alarma {
    // Static counter para generar IDs únicos
    static _nextId = 0;

    // constructor
    constructor(title, hour, minute, second, audio) {
        this._id = Alarma._nextId++;
        this._title = title;
        this._hour = hour;
        this._minute = minute;
        this._second = second;
        this._audio = audio;
        this._active = true;
        this._timeoutId = null;
    }

    // setters
    set title(title) {
        this._title = title;
    }
    set hour(hour) {
        this._hour = hour;
    }
    set minute(minute) {
        this._minute = minute;
    }
    set second(second) {
        this._second = second;
    }
    set audio(audio) {
        this._audio = audio;
    }
    set active(active) {
        this._active = active;
    }
    set timeoutId(timeoutId) {
        this._timeoutId = timeoutId;
    }
    set time(time) {
        const [hour, minute, second] = String(time).split(':');
        this._hour = hour;
        this._minute = minute;
        this._second = second;
    }
    set alarmData({ title, hour, minute, second, audio, active }) {
        this._title = title;
        this._hour = hour;
        this._minute = minute;
        this._second = second;
        this._audio = audio;
        this._active = active;
    }

    // getters
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get hour() {
        return this._hour;
    }
    get minute() {
        return this._minute;
    }
    get second() {
        return this._second;
    }
    get audio() {
        return this._audio;
    }
    get active() {
        return this._active;
    }
    get timeoutId() {
        return this._timeoutId;
    }
    get time() {
        return this._hour + ":" + this._minute + ":" + this._second;
    }
    get alarmData() {
        return {
            id: this._id,
            title: this._title,
            hour: this._hour,
            minute: this._minute,
            second: this._second,
            time: this.time,
            audio: this._audio,
            active: this._active
        };
    }

    makeHTML() {
        console.log("Generando HTML para alarma ID: " + this.id);
        return `<div class="alarma card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <div>
                                <h3 class="h6 mb-1">${this.title}</h3>
                                <div class="text-muted small">Hora: ${this.time}</div>
                                <div class="text-muted small">Audio: ${this.audio}</div>
                                <div class="text-muted small">Activa: ${this.active ? 'Sí' : 'No'}</div>
                                <audio src="${this.audio}"></audio>
                            </div>
                            <button class="btn btn-outline-danger btn-sm" onclick="borrarAlarmaIndividual('${this.time}')">Borrar</button>
                        </div>
                    </div>
                </div>`;
    }
}