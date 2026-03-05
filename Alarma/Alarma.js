export class Alarma {
    // Static counter para generar IDs únicos
    static _nextId = 0;

    // constructor
    constructor(title, hour, minute, second, audio) {
        this.id = Alarma._nextId++;
        this.title = title;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.audio = audio;
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

    // getters
    get id() {
        return this.id;
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
    getTime() {
        return this._hour + ":" + this._minute + ":" + this._second;
    }

    makeHTML() {
        console.log("Generando HTML para alarma ID: " + this.Id);
        return `<div class="alarma card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <div>
                                <h3 class="h6 mb-1">${this.title}</h3>
                                <div class="text-muted small">Hora: ${this.getTime()}</div>
                                <div class="text-muted small">Audio: ${this.audio}</div>
                                <div class="text-muted small">Activa: ${this.active ? 'Sí' : 'No'}</div>
                                <audio src="${this.audio}"></audio>
                            </div>
                            <button class="btn btn-outline-danger btn-sm" onclick="borrarAlarmaIndividual(${this.id})">Borrar</button>
                        </div>
                    </div>
                </div>`;
    }
}