export default class DrumkitButton {
    constructor({ key, audioElement, onClick }) {
        this.classNames = "btn btn-outline-primary drum-btn d-flex justify-content-center align-items-center";
        this.createNewElement = () => {
            const button = document.createElement("button");
            button.className = this.classNames;
            button.innerHTML = this.key;
            this.initClickEvent(button);
            this.element = button;
        };
        this.render = (container) => {
            container.append(this.element);
        };
        this.key = key;
        this.audioElement = audioElement;
        this.onClick = onClick;
        this.createNewElement();
    }
    initClickEvent(button) {
        button.addEventListener('click', (e) => {
            this.onClick(this.key);
        });
    }
}
