


export default class ToggleButton {

    _status: boolean = false;

    readonly className: string;

    readonly onClick: () => void;

    readonly id: string;

    readonly onContent: string;
    readonly offContent: string;



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

    get status() {
        return this._status;
    }

    set status(value: boolean) {
        this._status = value;

        this.updateButtonInnerHtml();
    }

    private updateButtonInnerHtml = () => {
        const button = this.element;

        if (button) { button.innerHTML = this.innerHTMLBasedOnStatus; }

    }


    public click = (): void => {
        this.status = !this.status;

        this.onClick();
    }

    get element(): HTMLButtonElement | null {
        return document.getElementById(this.id) as HTMLButtonElement | null;
    }

    get innerHTMLBasedOnStatus() {
        if (this.status) {
            return this.onContent;
        } else {
            return this.offContent;
        }
    }


    private generateButton = (): HTMLButtonElement => {
        const button = document.createElement("button");
        button.innerHTML = this.innerHTMLBasedOnStatus;
        button.className = this.className;
        button.id = this.id;

        this.initClickEvent(button);

        return button;
    }

    private initClickEvent = (button: HTMLButtonElement) => {
        button.addEventListener("click", () => {
            this.click();
        })
    }

    public render = (container: HTMLElement) => {
        container.append(this.generateButton());
    }



}