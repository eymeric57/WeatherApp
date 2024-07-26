const ICON_URL = "https://openweathermap.org/img/wn/";
class Weather{
    description;
    icon;
    locationName;
    country;

    constructor(weatherData){
        this.description = weatherData.description;
        this.icon = weatherData.icon;
        this.locationName = weatherData.locationName;
        this.country = weatherData.country;
    }

    getDom(){
        const weather = document.createElement("div");
        weather.innerHTML = `
        <div class="d-flex flex-column">
        <div class="d-flex align-items-center">
        <h6 class="mp-2">${this.locationName}</h6>
        <span class="ms-2">${this.country}</span>
      
        </div>
        <div class="d-flex align-items-center">
        <img src="${ICON_URL}${this.icon}@2x.png" alt="icon weather">
        <span class="mx-2">${this.description}</span>
       
        </div>
        </div>
        `;
        return weather
    }
}

export default Weather