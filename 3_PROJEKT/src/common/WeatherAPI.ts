import IWeather from "../interfaces/IWeather";
import Config from "./Config";

export class WeatherAPI {


    private readonly _apiKey: string;
    private readonly getFetchUrl = (q: string) => `http://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${this._apiKey}&units=${Config.units}`;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }



    public getWeather(city: string): Promise<IWeather> {
        const url = this.getFetchUrl(city);

        const weather = fetch(url).then(res => res.json()).catch(e => console.error(e));


        return weather as Promise<IWeather>;
    }


    public get apiKey(): string {
        return this._apiKey;
    }

}