import { DrumkitPanel } from './DrumkitPanel.js';
import { IAudioElements } from './interfaces.js'
import RecordingPanel from './RecordingPanel.js';



export default class DrumKit {

    readonly id = ""
    readonly keyboard: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    readonly drumkitPanel: DrumkitPanel;
    readonly audioElements: IAudioElements;
    readonly recordingPanel: RecordingPanel


    constructor() {
        this.drumkitPanel = new DrumkitPanel(this.keyboard, this);
        this.audioElements = this.audioDOMElements;
        this.recordingPanel = new RecordingPanel({
            container: (document.getElementById("paths") as HTMLDivElement),
            recordingPathsCount: 4,
            audioElements: this.audioElements
        });

        this.init();

        this.render();
    }

    public playSound = async (soundId: string, timeStamp: number) => {

        const audio = this.audioElements[soundId];
        audio.currentTime = 0;
        audio.play();

        this.recordingPanel.onSoundIsPlayed(soundId);
    }


    /* #region  Init methods */
    private init = () => {


    }
    /* #endregion */


    /* #region  Getters */

    public get container(): HTMLDivElement {
        return document.getElementById("drumkit_panel") as HTMLDivElement;
    }

    public get audioDOMElements(): IAudioElements {

        const audios: IAudioElements = {};

        this.keyboard.map((audioId) => {
            audios[audioId] = document.querySelector(`[data-audio-id="${audioId}"]`) as HTMLAudioElement
        })


        return audios;
    }

    /* #endregion */

    private render = (): void => {
        this.drumkitPanel.render(this.container);
    }


}

new DrumKit();