class Main {
  //properties
  temp;
  feels_like;
  pressure;
  humidity;
  temp_min;
  temp_max;

  //constructor
  constructor(mainData) {
    this.temp = mainData.temp;
    this.feels_like = mainData.feels_like;
    this.pressure = mainData.pressure;
    this.humidity = mainData.humidity;
    this.temp_min = mainData.temp_min;
    this.temp_max = mainData.temp_max;
  }

  getDom() {
    const main = document.createElement("div");
    main.innerHTML = `
        <div class="d-flex flex-column">
        <div class="d-flex align-items-center">
        <i class="bi bi-thermometer mx-2"></i>
        <span>Temperature: ${this.temp}°C(Ressenti: ${this.feels_like}°C)</span>
        
        </div>
        <div class="d-flex align-items-center">
        <i class="bi bi-thermometer-low mx-2"></i>
        <span>Temperature minium: ${this.temp_min}°C</span>
        </div>

        <div class="d-flex align-items-center">
        <i class="bi bi-thermometer-high mx-2"></i>
        <span>Temperature max: ${this.temp_max}°C</span>
        </div>


        <div class="d-flex align-items-center">
        <i class="bi bi-cloud-download-fill mx-2"></i>
        <span>Pression: ${this.pressure} hPa</span>
        </div>


        <div class="d-flex align-items-center">
        <i class="bi bi-droplet-half mx-2"></i>
        <span>Humidité: ${this.humidity}%</span>
        </div>
        </div>
        `;
    return main;
  }
}

export default Main;
