export default class ToggleButton {
    /**
     * Creates an instance of a Toggle button class.
     */
    constructor({ onContent, offContent, onClick, id, status = false, className = "" }) {
        /**
         * Whether button is toggled.
         */
        this._status = false;
        /**
         * Updates inner html of a button based on its status.
         */
        this.updateButtonInnerHtml = () => {
            const button = this.element;
            if (button) {
                button.innerHTML = this.innerHTMLBasedOnStatus;
            }
        };
        /**
         * Before onClick handler is executed.
         */
        this.click = () => {
            this.status = !this.status;
            this.onClick();
        };
        /**
         * Generates button.
         * @returns button
         */
        this.generateButton = () => {
            const button = document.createElement("button");
            button.innerHTML = this.innerHTMLBasedOnStatus;
            button.className = this.className;
            button.id = this.id;
            this.initClickEvent(button);
            return button;
        };
        /**
         * Initialises click event on a button.
         * @param button the html button instance.
         */
        this.initClickEvent = (button) => {
            button.addEventListener("click", () => {
                this.click();
            });
        };
        /**
         * Renders button into a container.
         *
         * @param container the container to which button is appended.
         */
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
    /**
     * Gets status of a button.
     */
    get status() {
        return this._status;
    }
    /**
     * Sets status of a button.
     */
    set status(value) {
        this._status = value;
        this.updateButtonInnerHtml();
    }
    /**
     * Gets element instance from a HTML Dom.
     */
    get element() {
        return document.getElementById(this.id);
    }
    /**
     * Gets inner html based on a button status.
     */
    get innerHTMLBasedOnStatus() {
        if (this.status) {
            return this.onContent;
        }
        else {
            return this.offContent;
        }
    }
}
