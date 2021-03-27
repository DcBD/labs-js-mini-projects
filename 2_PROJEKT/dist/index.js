var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DrumkitPanel } from './DrumkitPanel.js';
import RecordingPanel from './RecordingPanel.js';
export default class DrumKit {
    constructor() {
        this.id = "";
        this.keyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.playSound = (soundId, timeStamp) => __awaiter(this, void 0, void 0, function* () {
            const audio = this.audioElements[soundId];
            audio.currentTime = 0;
            audio.play();
            this.recordingPanel.onSoundIsPlayed(soundId);
        });
        /* #region  Init methods */
        this.init = () => {
        };
        /* #endregion */
        this.render = () => {
            this.drumkitPanel.render(this.container);
        };
        this.drumkitPanel = new DrumkitPanel(this.keyboard, this);
        this.audioElements = this.audioDOMElements;
        this.recordingPanel = new RecordingPanel({
            container: document.getElementById("paths"),
            recordingPathsCount: 4,
            audioElements: this.audioElements
        });
        this.init();
        this.render();
    }
    /* #endregion */
    /* #region  Getters */
    get container() {
        return document.getElementById("drumkit_panel");
    }
    get audioDOMElements() {
        const audios = {};
        this.keyboard.map((audioId) => {
            audios[audioId] = document.querySelector(`[data-audio-id="${audioId}"]`);
        });
        return audios;
    }
}
new DrumKit();
