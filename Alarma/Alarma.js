export class Alarma {
    // constructor
    constructor(title, hour, minute, second, audio) {
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
        return `<div class="alarma">
                    <h3>${this.getTitle()}</h3> 
                    <p>Hora: ${this.getTime()}</p>
                    <audio src="${this.getAudio()}" controls></audio>
                </div>`;
    }
}