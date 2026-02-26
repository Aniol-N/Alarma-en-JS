export class Alarma {
    // Static counter para generar IDs únicos
    static _nextId = 0;

    // constructor
    constructor(title, hour, minute, second, audio) {
        this.id = Alarma._nextId++;
        this.setTitle(title);
        this.setHour(hour);
        this.setMinute(minute);
        this.setSecond(second);
        this.setAudio(audio);
    }

    // setters
    setTitle(title) {
        this._title = title;
    }
    setHour(hour) {
        this._hour = hour;
    }
    setMinute(minute) {
        this._minute = minute;
    }
    setSecond(second) {
        this._second = second;
    }
    setAudio(audio) {
        this._audio = audio;
    }
    setActive(active) {
        this._active = active;
    }

    // getters
    getId() {
        return this.id;
    }
    getTitle() {
        return this._title;
    }
    getHour() {
        return this._hour;
    }
    getMinute() {
        return this._minute;
    }
    getSecond() {
        return this._second;
    }
    getAudio() {
        return this._audio;
    }
    getActive() {
        return this._active;
    }
    getTime() {
        return this._hour + ":" + this._minute + ":" + this._second;
    }

    makeHTML() {
        console.log("Generando HTML para alarma ID: " + this.getId());
        return `<div class="alarma card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <div>
                                <h3 class="h6 mb-1">${this.getTitle()}</h3>
                                <div class="text-muted small">Hora: ${this.getTime()}</div>
                                <div class="text-muted small">Audio: ${this.getAudio()}</div>
                                <div class="text-muted small">Activa: ${this.getActive() ? 'Sí' : 'No'}</div>
                                <audio src="${this.getAudio()}"></audio>
                            </div>
                            <button class="btn btn-outline-danger btn-sm" onclick="borrarAlarmaIndividual(${this.getId()})">Borrar</button>
                        </div>
                    </div>
                </div>`;
    }
}