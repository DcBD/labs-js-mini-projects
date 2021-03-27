
import { INote, IAudioElements } from './interfaces'

export default class Note implements INote {
    readonly soundId: string;
    readonly timeStamp: Number;


    constructor(soundId: string, timeStamp: number) {
        this.soundId = soundId;
        this.timeStamp = timeStamp;

    }


    public play = async (audioElements: IAudioElements) => {
        const audio = audioElements[this.soundId];

        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
}