import { Unit } from "../types/Unit";




export default class Config {




    public static get apiKey(): string {
        return "14e49f5e4f7411d8d7cc7c4499b3c2aa"; // WSEI key
    }

    public static get units(): Unit {
        return "metric";
    }

    public static get unitName(): string {
        if (this.units == "metric") {
            return "℃";
        } else {
            return "℉";
        }
    }

    public static saveCities(data: any) {

    }
}