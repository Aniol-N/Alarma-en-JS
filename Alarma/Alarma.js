export class Alarma {
    // Static counter para generar IDs únicos
    static _nextId = 0;

    // constructor
    constructor(title, hour, minute, second, audio) {
        this.id = Alarma._nextId++;
        this.Title = title;
        this.Hour = hour;
        this.Minute = minute;
        this.Second = second;
        this.Audio = audio;
    }

    // setters
    set Title(title) {
        this._title = title;
    }
    set Hour(hour) {
        this._hour = hour;
    }
    set Minute(minute) {
        this._minute = minute;
    }
    set Second(second) {
        this._second = second;
    }
    set Audio(audio) {
        this._audio = audio;
    }
    set Active(active) {
        this._active = active;
    }

    // getters
    get Id() {
        return this.id;
    }
    get Title() {
        return this._title;
    }
    get Hour() {
        return this._hour;
    }
    get Minute() {
        return this._minute;
    }
    get Second() {
        return this._second;
    }
    get Audio() {
        return this._audio;
    }
    get Active() {
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
                                <h3 class="h6 mb-1">${this.Title}</h3>
                                <div class="text-muted small">Hora: ${this.getTime()}</div>
                                <div class="text-muted small">Audio: ${this.Audio}</div>
                                <div class="text-muted small">Activa: ${this.Active ? 'Sí' : 'No'}</div>
                                <audio src="${this.Audio}"></audio>
                            </div>
                            <button class="btn btn-outline-danger btn-sm" onclick="borrarAlarmaIndividual(${this.Id})">Borrar</button>
                        </div>
                    </div>
                </div>`;
    }
}