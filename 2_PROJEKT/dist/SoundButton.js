export default class SoundButton {
    constructor(soundId, onClick) {
        this.className = "btn btn-primary p-4 m-1";
        this.generateButton = () => {
            const button = document.createElement("button");
            button.innerHTML = this.soundId;
            button.className = this.className;
            this.initClickEvent(button);
            return button;
        };
        this.initClickEvent = (button) => {
            button.addEventListener("click", (e) => {
                this.handleClick(e.timeStamp);
            });
        };
        this.handleClick = (timeStamp) => {
            this.onClick(this.soundId, timeStamp);
        };
        this.render = (container) => {
            container.append(this.generateButton());
        };
        this.id = `sound-button-${soundId}`;
        this.soundId = soundId;
        this.onClick = onClick;
    }
    get button() {
        return document.getElementById(this.id);
    }
}
