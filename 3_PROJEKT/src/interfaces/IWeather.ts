import ICoordinates from "./ICoordinates";
import IDetails from "./IDetails";
import IMain from "./IMain";
import ISys from "./ISys";
import IWind from "./IWind";

export default interface IWeather {

    // Internal parameter
    base: string

    clouds: {
        all: number
    },

    coord: ICoordinates

    dt: number

    id: number

    main: IMain

    name: string

    sys: ISys

    timezone: number

    visibility: number

    weather: Array<IDetails>

    wind: IWind


}