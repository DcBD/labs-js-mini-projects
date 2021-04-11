import IWeather from "../interfaces/IWeather";
import Config from "./Config";




interface IWidget {

    root: HTMLElement

    // Unique id
    id: string

    data: IWeather


}

export default class Widget {

    private readonly root: HTMLElement
    private readonly id: string
    private _isCreated: boolean = false;
    private data: IWeather;
    private _innerHTML: string = "";

    constructor({
        root,
        id,
        data,
    }: IWidget) {
        this.root = root;
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
        `;
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
            instance.innerHTML = this._innerHTML;

            this.isCreated = true;

            return instance;
        }

        return null;
    }

    private render = () => {

        if (this.container instanceof HTMLElement) {
            this.container.innerHTML = this._innerHTML;
        } else {
            this.root.append(this.widgetDOM)
        }
    }

}