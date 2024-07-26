import ResponseService from "./ResponseService";
import HttpUtils from "../Tools/HttpUtils";

class WeatherService {
  apiKey;
  options;

  constructor(apiKey, userOptions = {}) {
    this.apiKey = apiKey;

    this.options = {
      lang: "fr",
      units: "metric",
    };

    Object.assign(this.options, { appid: apiKey }, userOptions);
  }

  getCurrent(coords) {
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    Object.assign(this.options, coords);

    const URL = HttpUtils.buildUrl(BASE_URL, this.options);

    return new Promise((resolve) => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          //code 400 = erreur de requete
          //code 404 = ville non trouvée
          if (data.cod == 400 || data.cod == 404) {
            resolve(new ResponseService(false, data.message, null));
          }
          resolve(new ResponseService(true, null, data));
        })
        .catch(error =>{
            resolve(new ResponseService(false, error.message, null));
        })
    });
  }
}

export default WeatherService;
