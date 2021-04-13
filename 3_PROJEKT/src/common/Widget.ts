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
    public readonly id: string
    private _isCreated: boolean = false;
    private data: IWeather;
    private _innerHTML: string = "";
    private readonly handleRemove: (id: string) => void
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


    public refreshWidget = (data: IWeather) => {
        this.data = data;
        this.prepareHTML();
        this.render();
    }

    private run = () => {
        this.prepareHTML();
        this.render();
    }


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

    private getGeneratedButton = (): HTMLButtonElement => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "delete-btn";
        button.innerText = "×";

        button.addEventListener("click", () => { this.container.remove(); this.handleRemove(this.id) });

        return button;
    }




    public get container(): HTMLElement | null {
        return document.getElementById(this.id);
    }


    private get isCreated(): boolean {
        return this._isCreated;
    }

    private set isCreated(val: boolean) {
        if (this.isCreated) {
            console.error("Can not change is created if already is created");
        } else {
            this._isCreated = val;
        }
    }

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

    private render = () => {

        if (this.container instanceof HTMLElement) {
            this.container.querySelector(".w-content").innerHTML = this._innerHTML;
        } else {
            this.parent.append(this.widgetDOM)
        }
    }

}