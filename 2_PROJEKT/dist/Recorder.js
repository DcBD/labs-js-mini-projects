import Note from "./Note.js";
var RecorderStatus;
(function (RecorderStatus) {
    RecorderStatus[RecorderStatus["RECORDING"] = 0] = "RECORDING";
    RecorderStatus[RecorderStatus["PAUSED"] = 1] = "PAUSED";
})(RecorderStatus || (RecorderStatus = {}));
export default class Recorder {
    constructor() {
        this.status = RecorderStatus.PAUSED;
        this.recording = [];
        this.startedAt = 0;
        this.clear = () => {
            this.pause();
            this.startedAt = 0;
            this.recording = [];
        };
        this.pause = () => {
            this.status = RecorderStatus.PAUSED;
        };
        this.resume = () => {
            this.status = RecorderStatus.RECORDING;
            if (this.startedAt === 0) {
                this.startedAt = Date.now();
            }
        };
        this.toggle = () => {
            if (this.status === RecorderStatus.RECORDING) {
                this.pause();
            }
            else {
                this.resume();
            }
            console.log(this.status);
            console.log(this.recording);
        };
    }
    get isRecording() {
        return this.status === RecorderStatus.RECORDING;
    }
    pushNote(note) {
        if (this.isRecording) {
            this.recording.push(new Note(note.soundId, +note.timeStamp));
        }
    }
}
