import SoundButton from './SoundButton.js'
import DrumKit from './index.js'


export class DrumkitPanel {

    readonly keyboard: Array<string>;

    readonly containerClassName = "d-flex";

    readonly drumKit: DrumKit;

    soundButtons: Array<SoundButton> = [];

    _generatedContainer: HTMLElement | undefined;



    constructor(keyboard: Array<string>, drumKit: DrumKit) {
        this.keyboard = keyboard;
        this.drumKit = drumKit;

        this.init();
    }


    init = (): void => {
        this.generateContainer();
        this.generateSoundButtons();
        this.renderSoundButtons();
        this.initKeyboardKeyPress();
    }




    renderSoundButtons = () => {
        this.soundButtons.map(button => button.render(this._generatedContainer as HTMLElement));
    }

    private generateContainer(): void {
        const div = document.createElement("div");

        div.className = this.containerClassName;

        this._generatedContainer = div;
    }

    private generateSoundButtons = () => {
        this.soundButtons = this.keyboard.map((soundId: string) => new SoundButton(soundId, this.drumKit.playSound))
    }



    private initKeyboardKeyPress = () => {
        document.body.addEventListener("keydown", (e) => {
            if (this.keyboard.filter(key => key == e.key.toLowerCase()).length > 0) {
                this.drumKit.playSound(e.key.toLowerCase(), e.timeStamp)
            }
        })
    }




    render = (container: HTMLDivElement): void => {
        container.append(this._generatedContainer as HTMLElement);
    }



}