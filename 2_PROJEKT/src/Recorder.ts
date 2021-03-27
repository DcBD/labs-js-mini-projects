import { INote } from "./interfaces";
import Note from "./Note.js";

enum RecorderStatus {
    RECORDING,
    PAUSED,
}




export default class Recorder {

    status: RecorderStatus = RecorderStatus.PAUSED;

    recording: Array<Note> = [];
    startedAt: number = 0;


    constructor() {

    }

    public get isRecording() {
        return this.status === RecorderStatus.RECORDING;
    }

    public pushNote(note: INote): void {
        if (this.isRecording) {
            this.recording.push(new Note(note.soundId, +note.timeStamp))
        }
    }

    public clear = (): void => {
        this.pause();
        this.startedAt = 0;
        this.recording = [];
    }

    public pause = (): void => {
        this.status = RecorderStatus.PAUSED;
    }

    public resume = (): void => {
        this.status = RecorderStatus.RECORDING;

        if (this.startedAt === 0) {
            this.startedAt = Date.now();
        }
    }

    public toggle = (): void => {
        if (this.status === RecorderStatus.RECORDING) {

            this.pause();
        } else {
            this.clear();
            this.resume();
        }

        console.log(this.status);
        console.log(this.recording);
    }













}