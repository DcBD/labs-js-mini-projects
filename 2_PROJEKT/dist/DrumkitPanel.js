import SoundButton from './SoundButton.js';
export class DrumkitPanel {
    constructor(keyboard, drumKit) {
        this.containerClassName = "d-flex";
        this.soundButtons = [];
        this.init = () => {
            this.generateContainer();
            this.generateSoundButtons();
            this.renderSoundButtons();
            this.initKeyboardKeyPress();
        };
        this.renderSoundButtons = () => {
            this.soundButtons.map(button => button.render(this._generatedContainer));
        };
        this.generateSoundButtons = () => {
            this.soundButtons = this.keyboard.map((soundId) => new SoundButton(soundId, this.drumKit.playSound));
        };
        this.initKeyboardKeyPress = () => {
            document.body.addEventListener("keydown", (e) => {
                if (this.keyboard.filter(key => key == e.key.toLowerCase()).length > 0) {
                    this.drumKit.playSound(e.key.toLowerCase(), e.timeStamp);
                }
            });
        };
        this.render = (container) => {
            container.append(this._generatedContainer);
        };
        this.keyboard = keyboard;
        this.drumKit = drumKit;
        this.init();
    }
    generateContainer() {
        const div = document.createElement("div");
        div.className = this.containerClassName;
        this._generatedContainer = div;
    }
}
