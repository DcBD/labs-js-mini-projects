import DrumkitButton from "./DrumkitButton.js";


interface IAudioElements {
    [name: string]: HTMLAudioElement;
}


class DrumKit {

    keyboard: Array<string> = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

    readonly buttons: Array<DrumkitButton>
    readonly audioElements: IAudioElements

    constructor() {

        this.audioElements = this.initAudioElements();
        this.buttons = this.generateButtons();


        this.init();

    }

    init = (): void => {
        this.render();
    }

    render = () => {
        this.renderButtons();
    }

    renderButtons = () => {
        const panel = this.soundPanel;

        for (const button of this.buttons) {
            button.render(panel);
        }
    }







    private playSound = (soundId: string): void => {
        const audioElement = this.audioElements[soundId];

        audioElement.play();
    }

    generateButtons = (): Array<DrumkitButton> => {
        return this.keyboard.map((key, i) => {

            const audioElement = this.audioElements[key];

            return new DrumkitButton({
                key: key,
                onClick: this.playSound,
                audioElement: audioElement

            });
        }) as Array<DrumkitButton>
    }

    initAudioElements = (): IAudioElements => {

        const audios: IAudioElements = {};

        this.keyboard.map((audioId) => {
            audios[audioId] = document.querySelector(`[data-audio-id="${audioId}"]`) as HTMLAudioElement
        })

        console.log(audios);

        return audios;
    }


    get soundPanel(): HTMLDivElement {
        return document.querySelector("#sound_panel") as HTMLDivElement;
    }



}



const kit = new DrumKit();