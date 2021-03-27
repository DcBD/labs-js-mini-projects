

export default class SoundButton {

    readonly id: string;
    readonly soundId: string;

    readonly className = "btn btn-primary p-4 m-1";
    readonly onClick: (soundId: string, timeStamp: number) => void

    constructor(soundId: string, onClick: (soundId: string, timeStamp: number) => void) {
        this.id = `sound-button-${soundId}`;
        this.soundId = soundId;
        this.onClick = onClick;
    }


    private generateButton = (): HTMLButtonElement => {
        const button = document.createElement("button");
        button.innerHTML = this.soundId;
        button.className = this.className;

        this.initClickEvent(button);

        return button;
    }

    public get button(): HTMLButtonElement {
        return document.getElementById(this.id) as HTMLButtonElement;
    }

    private initClickEvent = (button: HTMLButtonElement): void => {
        button.addEventListener("click", (e) => {
            this.handleClick(e.timeStamp);
        })
    }

    public handleClick = (timeStamp: number) => {

        this.onClick(this.soundId, timeStamp);

    }

    render = (container: HTMLElement): void => {
        container.append(this.generateButton());
    }

}