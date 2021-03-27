export default class ToggleButton {
    constructor({ onContent, offContent, onClick, id, status = false, className = "" }) {
        this._status = false;
        this.updateButtonInnerHtml = () => {
            const button = this.element;
            if (button) {
                button.innerHTML = this.innerHTMLBasedOnStatus;
            }
        };
        this.click = () => {
            this.status = !this.status;
            this.onClick();
        };
        this.generateButton = () => {
            const button = document.createElement("button");
            button.innerHTML = this.innerHTMLBasedOnStatus;
            button.className = this.className;
            button.id = this.id;
            this.initClickEvent(button);
            return button;
        };
        this.initClickEvent = (button) => {
            button.addEventListener("click", () => {
                this.click();
            });
        };
        this.render = (container) => {
            container.append(this.generateButton());
        };
        this.onClick = onClick;
        this.id = id;
        this.onContent = onContent;
        this.offContent = offContent;
        this.status = status;
        this.className = className;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
        this.updateButtonInnerHtml();
    }
    get element() {
        return document.getElementById(this.id);
    }
    get innerHTMLBasedOnStatus() {
        if (this.status) {
            return this.onContent;
        }
        else {
            return this.offContent;
        }
    }
}
