import Config from "./common/Config";
import { WeatherAPI } from "./common/WeatherAPI";
import Widget from "./common/Widget";



export class App {

    private readonly _api: WeatherAPI;
    private widgets: { [key: string]: Widget } = {};
    private readonly root: HTMLElement = document.getElementById("root");

    constructor() {
        this._api = new WeatherAPI(Config.apiKey);

        this.init();
    }

    public addWidget = (city: string) => {
        this._api.getWeather(city).then(data => {

            if (this.widgets[city]) {
                this.widgets[city].refreshWidget(data);
            } else {
                this.widgets[city] = new Widget({
                    root: this.root,
                    data: data,
                    id: city

                })
            }

        })
    }

    private init = () => {


        this.addWidget("zakopane")
        this.addWidget("Orlando")


    }




    // saveData(data: any) {
    //     localStorage.setItem('weatherData', JSON.stringify(data));
    // }
    // getData() {
    //     const data = localStorage.getItem('weatherData');
    //     if (data) {
    //         return JSON.parse(data);
    //     } else {
    //         return {};
    //     }
    // }
}