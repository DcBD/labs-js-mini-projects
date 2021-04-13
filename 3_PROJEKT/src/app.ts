import Config from "./common/Config";
import SearchBar from "./common/SearchBar";
import { WeatherAPI } from "./common/WeatherAPI";
import Widget from "./common/Widget";
import IWeather from './interfaces/IWeather'


export class App {

    private readonly _api: WeatherAPI;
    private widgets: { [key: string]: Widget } = {};
    private readonly root: HTMLElement = document.getElementById("root") as HTMLElement;

    constructor() {
        this._api = new WeatherAPI(Config.apiKey);

        this.init();
    }

    public addWidget = (city: string) => {

        const cityLowerCase = city.toLowerCase();

        this._api.getWeather(cityLowerCase).then(data => {

            if (this.widgets[data.name]) {
                this.widgets[data.name].refreshWidget(data);
            } else {
                this.widgets[data.name] = new Widget({
                    root: this.root,
                    data: data,
                    id: data.name,
                    handleRemove: this.handleRemoveWidget
                })
            }
            this.save();

        }).catch((e: { cod: Number, message: string }) => alert(e.message))

    }

    public handleRemoveWidget = (id: string) => {
        delete this.widgets[id];

        this.save();
    }

    private init = () => {


        new SearchBar(this.root, (q: string) => { this.addWidget(q); });


        this.load();


    }


    private save = () => {
        Config.saveCities(Object.values(this.widgets).map(widget => widget.id))
    }

    private load = () => {
        Config.getCities().map(city => this.addWidget(city));
    }
}