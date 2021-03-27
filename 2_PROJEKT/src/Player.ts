import { IAudioElements, INote } from "./interfaces";
import Note from "./Note.js";
import Tools from "./Tools.js";

enum PlayerStatus {
    PLAYING,
    STOPPED
}


export default class Player {

    status: PlayerStatus = PlayerStatus.STOPPED;
    currentPath?: Array<Note>;
    readonly audioElements: IAudioElements


    constructor(audioElements: IAudioElements) {
        this.audioElements = audioElements;
    }

    public get isPlaying(): boolean {
        return this.status === PlayerStatus.PLAYING;
    }

    public stop = () => {
        this.status = PlayerStatus.STOPPED;
    }

    public play = async (path?: Array<Note>): Promise<boolean> => {
        if (path) this.currentPath = path;

        if (!this.currentPath) {
            this.status = PlayerStatus.PLAYING;
            console.info("There is nothing to play..");
            return false;
        } else {
            this.status = PlayerStatus.PLAYING;
            return await this.playNotes(this.currentPath);
        }


    }

    private playNotes = async (notes: Array<Note>) => {
        for (const [index, note] of notes.entries()) {
            if (!this.isPlaying) {
                return false;
            }
            const delay: number = notes[index + 1] ? (+notes[index + 1].timeStamp - +note.timeStamp) : 0;

            note.play(this.audioElements);


            await Tools.delay(delay);
        }

        this.stop();

        return true;
    }




}