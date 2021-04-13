import IWeather from "../interfaces/IWeather";
import Config from "./Config";

/**
 * Manages api calls for a OpenWeatherMap.Org
 */
export class WeatherAPI {


    private readonly _apiKey: string;
    private readonly getFetchUrl = (q: string) => `http://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${this._apiKey}&units=${Config.units}`;

    /**
     * Creates an instance of a WeatherAPI
     * @param apiKey api key.
     */
    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }


    /**
     * Gets weather for a city.
     * 
     * @param city name of a city
     * @returns 
     */
    public getWeather(city: string): Promise<IWeather> {
        const url = this.getFetchUrl(city);

        const weather = fetch(url).then(res => res.json()).then((data: { message?: string }) => {
            if (data.message) throw Error(data.message);

            return data as IWeather;
        });


        return weather as Promise<IWeather>;
    }

    /**
     * Gets api key.
     */
    public get apiKey(): string {
        return this._apiKey;
    }

}