import IWeather from "../interfaces/IWeather";
import Config from "./Config";




interface IWidget {

    root: HTMLElement

    // Unique id
    id: string

    data: IWeather

    handleRemove: (id: string) => void


}

export default class Widget {

    private readonly parent: HTMLElement
    private _isCreated: boolean = false;
    private data: IWeather;
    private _innerHTML: string = "";
    private readonly handleRemove: (id: string) => void

    /**
     * The id attribute of a widget.
     */
    public readonly id: string

    constructor({
        root,
        id,
        data,
        handleRemove
    }: IWidget) {
        this.parent = root.querySelector("#widgets");
        this.handleRemove = handleRemove;
        this.id = id;
        this.data = data;
        this.run();
    }

    /**
     * Rerenders widget with new data.
     * 
     * @param data data to refresh
     */
    public refreshWidget = (data: IWeather) => {
        this.data = data;
        this.prepareHTML();
        this.render();
    }

    /**
     * Runs widget / renders.
     */
    private run = () => {
        this.prepareHTML();
        this.render();
    }

    /**
     * Prepares innerHTML for a widget.
     */
    private prepareHTML = () => {
        const { name, main: { temp, pressure, humidity }, weather: { 0: { main } } } = this.data;

        console.log(this.data);
        this._innerHTML = `
            <div class='w-content'>
                <div class='w-name' >${name}</div>
                <div class='w-main' >${main}</div>
                <div class='w-group'>
                    <div class='w-temp'>${~~temp} ${Config.unitName}</div>
                    <div class='w-details'>
                        <div class='w-details-title'>Ciśnienie</div>
                        <div class='w-details-data'>${pressure} hPA</div>
                        <div class='w-details-title'> Wilgotność </div>
                        <div class='w-details-data'>${humidity}%</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generates button element.
     * @returns generated button element.
     */
    private getGeneratedButton = (): HTMLButtonElement => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "delete-btn";
        button.innerText = "×";

        button.addEventListener("click", () => { this.container.remove(); this.handleRemove(this.id) });

        return button;
    }



    /**
     * Gets widget container from DOM.
     */
    public get container(): HTMLElement | null {
        return document.getElementById(this.id);
    }

    /**
     * Gets whether widget was created.
     */
    private get isCreated(): boolean {
        return this._isCreated;
    }

    /**
     * Sets whether widget was created.
     * If widget was created, the value can not be changed to `false`.
     */
    private set isCreated(val: boolean) {
        if (this.isCreated) {
            console.error("Can not change is created if already is created");
        } else {
            this._isCreated = val;
        }
    }

    /**
     * Gets widget generated dom element.
     */
    private get widgetDOM(): HTMLDivElement | null {
        if (!this.isCreated || this.container === null) {
            const instance = document.createElement("div");
            instance.className = "widget";
            instance.id = this.id;
            const wContent = document.createElement("div");
            wContent.className = "w-content";
            wContent.innerHTML = this._innerHTML;
            instance.append(wContent);
            instance.append(this.getGeneratedButton());
            this.isCreated = true;

            return instance;
        }

        return null;
    }

    /**
     * Renders widget into DOM.
     */
    private render = () => {

        if (this.container instanceof HTMLElement) {
            this.container.querySelector(".w-content").innerHTML = this._innerHTML;
        } else {
            this.parent.append(this.widgetDOM)
        }
    }

}