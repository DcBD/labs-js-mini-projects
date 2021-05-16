export default interface IMain {

    // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. 
    feels_like: number

    // Humidity, %
    humidity: number

    // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    pressure: number

    // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. 
    temp: number

    // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_max: number

    //Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_min: number


}