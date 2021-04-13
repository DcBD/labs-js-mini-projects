import { Unit } from "../types/Unit";




/**
 * Configuration helper object.
 */
export default class Config {


    /**
     * Api key.
     */
    public static get apiKey(): string {
        return "14e49f5e4f7411d8d7cc7c4499b3c2aa"; // WSEI key
    }

    /**
     * The units of displayed data.
     */
    public static get units(): Unit {
        return "metric";
    }

    /**
     * Gets unit name
     */
    public static get unitName(): string {
        if (this.units == "metric") {
            return "℃";
        } else {
            return "℉";
        }
    }

    /**
     * Saves cities into local storage.
     * 
     * @param data data to save
     */
    public static saveCities(data: Array<string>) {
        localStorage.setItem('WeatherAPICities', JSON.stringify(data));
    }

    /**
     * Saves cities into local storage.
     * 
     * @returns name of a saved cities
     */
    public static getCities(): Array<string> {

        const data = localStorage.getItem('WeatherAPICities');

        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }

    }
}