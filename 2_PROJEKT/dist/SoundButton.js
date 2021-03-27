/**
 * Button that plays the drumkit sound.
 */
export default class SoundButton {
    /**
     * Creates an instance of SoundButton.
     *
     * @param soundId the id of a sound.
     * @param onClick the on click handler.
     */
    constructor(soundId, onClick) {
        /**
         * The class attribute of a element.
         */
        this.className = "btn btn-primary p-4 m-1";
        /**
         * Generates button.
         *
         * @returns generated button element.
         */
        this.generateButton = () => {
            const button = document.createElement("button");
            button.innerHTML = this.soundId;
            button.className = this.className;
            this.initClickEvent(button);
            return button;
        };
        /**
         * Initialises click event on a button.
         *
         * @param button generated instance of a button.
         */
        this.initClickEvent = (button) => {
            button.addEventListener("click", (e) => {
                this.handleClick(e.timeStamp);
            });
        };
        /**
         * Click handler.
         *
         * @param timeStamp the timestamp when click event was executed.
         */
        this.handleClick = (timeStamp) => {
            this.onClick(this.soundId, timeStamp);
        };
        /**
         * Renders button into a container.
         *
         * @param container the target container.
         */
        this.render = (container) => {
            container.append(this.generateButton());
        };
        this.id = `sound-button-${soundId}`;
        this.soundId = soundId;
        this.onClick = onClick;
    }
    /**
     * Gets button from HTML DOM
     */
    get button() {
        return document.getElementById(this.id);
    }
}
