

export default class DrumkitButton {

    classNames: string = "btn btn-outline-primary drum-btn d-flex justify-content-center align-items-center";

    element?: HTMLElement;

    readonly key: string;
    readonly audioElement: HTMLAudioElement;
    readonly onClick: (soundId: string) => void;

    constructor({ key, audioElement, onClick }: {
        key: string,
        audioElement: HTMLAudioElement,
        onClick: (soundId: string) => void
    }) {
        this.key = key;
        this.audioElement = audioElement;
        this.onClick = onClick;

        this.createNewElement();
    }


    private createNewElement = () => {

        const button = document.createElement("button");
        button.className = this.classNames;
        button.innerHTML = this.key;

        this.initClickEvent(button);

        this.element = button;
    }


    private initClickEvent(button: HTMLButtonElement) {
        button.addEventListener('click', (e) => {
            this.onClick(this.key);
        });
    }

    public render = (container: HTMLElement) => {
        container.append(this.element);
    }
}

