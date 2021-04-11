import Config from "./common/Config";
import { WeatherAPI } from "./common/WeatherAPI";

export class App {

    private readonly _api: WeatherAPI;

    constructor() {
        this._api = new WeatherAPI(Config.apiKey);

        this.init();
    }

    private init = () => {


        const weather = this._api.getWeather("zakopane");

        weather.then(_w => console.log(_w));
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