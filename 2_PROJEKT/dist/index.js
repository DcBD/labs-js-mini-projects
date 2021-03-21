import DrumkitButton from "./DrumkitButton.js";
class DrumKit {
    constructor() {
        this.keyboard = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
        this.init = () => {
            this.render();
        };
        this.render = () => {
            this.renderButtons();
        };
        this.renderButtons = () => {
            const panel = this.soundPanel;
            for (const button of this.buttons) {
                button.render(panel);
            }
        };
        this.playSound = (soundId) => {
            const audioElement = this.audioElements[soundId];
            audioElement.play();
        };
        this.generateButtons = () => {
            return this.keyboard.map((key, i) => {
                const audioElement = this.audioElements[key];
                return new DrumkitButton({
                    key: key,
                    onClick: this.playSound,
                    audioElement: audioElement
                });
            });
        };
        this.initAudioElements = () => {
            const audios = {};
            this.keyboard.map((audioId) => {
                audios[audioId] = document.querySelector(`[data-audio-id="${audioId}"]`);
            });
            console.log(audios);
            return audios;
        };
        this.audioElements = this.initAudioElements();
        this.buttons = this.generateButtons();
        this.init();
    }
    get soundPanel() {
        return document.querySelector("#sound_panel");
    }
}
const kit = new DrumKit();
