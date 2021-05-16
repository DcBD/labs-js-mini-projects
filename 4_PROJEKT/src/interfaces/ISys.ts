import { Country } from "../types/Country";

export default interface ISys {
    country: Country
    id: number
    sunrise: number
    sunset: number
    type: number
}