
/**
 * Button that plays the drumkit sound.
 */
export default class SoundButton {

    /**
     * The id attribute of a button.
     */
    readonly id: string;

    /**
     * The id of a sound to be played.
     */
    readonly soundId: string;

    /**
     * The class attribute of a element.
     */
    readonly className = "btn btn-primary p-4 m-1";

    /**
     * The onClick hanlder.
     */
    readonly onClick: (soundId: string, timeStamp: number) => void

    /**
     * Creates an instance of SoundButton.
     * 
     * @param soundId the id of a sound.
     * @param onClick the on click handler.
     */
    constructor(soundId: string, onClick: (soundId: string, timeStamp: number) => void) {
        this.id = `sound-button-${soundId}`;
        this.soundId = soundId;
        this.onClick = onClick;
    }


    /**
     * Generates button.
     * 
     * @returns generated button element.
     */
    private generateButton = (): HTMLButtonElement => {
        const button = document.createElement("button");
        button.innerHTML = this.soundId;
        button.className = this.className;

        this.initClickEvent(button);

        return button;
    }

    /**
     * Gets button from HTML DOM
     */
    public get button(): HTMLButtonElement {
        return document.getElementById(this.id) as HTMLButtonElement;
    }

    /**
     * Initialises click event on a button.
     * 
     * @param button generated instance of a button.
     */
    private initClickEvent = (button: HTMLButtonElement): void => {
        button.addEventListener("click", (e) => {
            this.handleClick(e.timeStamp);
        })
    }

    /**
     * Click handler.
     * 
     * @param timeStamp the timestamp when click event was executed.
     */
    public handleClick = (timeStamp: number) => {

        this.onClick(this.soundId, timeStamp);

    }

    /**
     * Renders button into a container.
     * 
     * @param container the target container.
     */
    render = (container: HTMLElement): void => {
        container.append(this.generateButton());
    }

}