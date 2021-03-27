


export default class ToggleButton {

    /**
     * Whether button is toggled.
     */
    _status: boolean = false;

    /**
     * The class names appended to the button element.
     */
    readonly className: string;

    /**
     * The id (html attribute) of button.
     */
    readonly id: string;

    /**
     * The method executed after button is toggled.
     */
    readonly onClick: () => void;

    /**
     * The InnerHTML of a button when its activated.
     */
    readonly onContent: string;

    /**
     * The InnerHTML of a button when its not activated.
     */
    readonly offContent: string;


    /**
     * Creates an instance of a Toggle button class.
     */
    constructor({ onContent, offContent, onClick, id, status = false, className = "" }: {
        onContent: string,
        offContent: string,
        onClick: () => void
        id: string,
        status?: boolean,
        className?: string
    }) {
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
    set status(value: boolean) {
        this._status = value;

        this.updateButtonInnerHtml();
    }

    /**
     * Updates inner html of a button based on its status.
     */
    private updateButtonInnerHtml = () => {
        const button = this.element;

        if (button) { button.innerHTML = this.innerHTMLBasedOnStatus; }

    }

    /**
     * Before onClick handler is executed.
     */
    public click = (): void => {
        this.status = !this.status;

        this.onClick();
    }

    /**
     * Gets element instance from a HTML Dom.
     */
    get element(): HTMLButtonElement | null {
        return document.getElementById(this.id) as HTMLButtonElement | null;
    }

    /**
     * Gets inner html based on a button status.
     */
    get innerHTMLBasedOnStatus() {
        if (this.status) {
            return this.onContent;
        } else {
            return this.offContent;
        }
    }

    /**
     * Generates button.
     * @returns button
     */
    private generateButton = (): HTMLButtonElement => {
        const button = document.createElement("button");
        button.innerHTML = this.innerHTMLBasedOnStatus;
        button.className = this.className;
        button.id = this.id;

        this.initClickEvent(button);

        return button;
    }

    /**
     * Initialises click event on a button.
     * @param button the html button instance.
     */
    private initClickEvent = (button: HTMLButtonElement) => {
        button.addEventListener("click", () => {
            this.click();
        })
    }

    /**
     * Renders button into a container.
     * 
     * @param container the container to which button is appended. 
     */
    public render = (container: HTMLElement) => {
        container.append(this.generateButton());
    }



}