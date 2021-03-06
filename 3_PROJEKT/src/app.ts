import Config from "./common/Config";
import SearchBar from "./common/SearchBar";
import { WeatherAPI } from "./common/WeatherAPI";
import Widget from "./common/Widget";
import IWeather from './interfaces/IWeather'


export class App {

    private readonly _api: WeatherAPI;
    private widgets: { [key: string]: Widget } = {};
    private readonly root: HTMLElement = document.getElementById("root") as HTMLElement;

    /**
     * Creates an instance of an app.
     */
    constructor() {
        this._api = new WeatherAPI(Config.apiKey);

        this.init();
    }

    /**
     * Adds widget with a city.
     * 
     * @param city the name of a city
     */
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

    /**
     * Handler for removing widget.
     */
    public handleRemoveWidget = (id: string) => {
        delete this.widgets[id];

        this.save();
    }

    /**
     * Initializes component.
     */
    private init = () => {
        new SearchBar(this.root, this.addWidget);

        this.load();
    }


    /**
     * Saves widgets/
     */
    private save = () => {
        Config.saveCities(Object.values(this.widgets).map(widget => widget.id))
    }

    /**
     * Loads saved widgets.
     */
    private load = () => {
        Config.getCities().map(city => this.addWidget(city));
    }
}