// import des styles de bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// import des scripts de bootstrap
import "bootstrap/dist/js/bootstrap.min.js";
// import des icons de bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";

import { API_KEY } from "./config.js";
import WeatherService from "./Services/WeatherService.js";

import MainWeather from "./Classes/MainWeather.js";

class App {
  // on déclare nos propriétés
  // PROPRIÉTÉS DU DOM
  elInputNewLon;
  elInputNewLat;
  elInputNewCity;
  elResultDiv;

  // PROPRIÉTÉS DE SERVICES
  weatherServiceFr;
  weatherServiceUk;
  weatherServiceUs;

  constructor() {
    this.weatherServiceFr = new WeatherService(API_KEY);
    this.weatherServiceUk = new WeatherService(API_KEY, { lang: "en" });
    this.weatherServiceUs = new WeatherService(API_KEY, {
      lang: "en",
      units: "imperial",
    });
  }

  start() {
    console.log("App started");
    this.loadDom();
  }

  loadDom() {
    // on va récupérer l'élément app d'index.html
    const elApp = document.getElementById("app");
    // on va créer un element conteneur
    const elDivContainer = document.createElement("div");
    elDivContainer.className = "container mt-5 col-12 col-md-8 col-lg-6";

    // on crée un conteneur pour le titre et l'image
    const elTitleContainer = document.createElement("div");
    elTitleContainer.className = "d-flex align-items-center";

    //on crée l'image avec innerHtml
    const elImage = document.createElement("img");
    elImage.src = "./src/assets/logo.png";
    elImage.alt = "logo";
    elImage.className = "me-3 logo";

    //on crer le titre
    const elH1 = document.createElement("h1");
    elH1.textContent = "Appli Météo";

    // on ajoute l'image et le titre dans le conteneur
    elTitleContainer.append(elH1, elImage);

    //on ajoute le conteneur du titre dans le conteneur principal
    elDivContainer.append(elTitleContainer);

    //création des onglets
    const elTabList = document.createElement("ul");
    elTabList.className = "nav nav-tabs mt-4";
    elTabList.innerHTML = `
         <li class="nav-item">
         <a class="nav-link active text-warning" id="byCoord-tab"
         data-bs-toggle="tab" href="#byCoord" role="tab" aria-controls="byCoord"
         aria-selected="true">Par Coordonnées</a> </li>

         
         <li class="nav-item">
         <a class="nav-link text-warning" id="byCity-tab"
         data-bs-toggle="tab" href="#byCity" role="tab" aria-controls="byCity"
         aria-selected="false">Par Ville</a> </li>`;

    //on crée le contenu des onglets
    const elTableContent = document.createElement("div");
    elTableContent.className = "tab-content";
    elTableContent.innerHTML = `
         <div class="tab-pane fade show active" id="byCoord" role="tabpanel" aria-labelledby="byCoord-tab">
         <h4 class="mt-4">Entrer les coordonnées géographiques ( latitude et longitude )</h4>

         <div class="form-group">
        <label class="text-warning" for="newLat">Latitude:</label>
        <input type="text" class="form-control" id="latitude" >
         </div>

           <div class="form-group">
        <label class="text-warning" for="newLat">Longitude:</label>
        <input type="text" class="form-control" id="longitude" >
         </div>  
         </div>


          <div class="tab-pane fade " id="byCity" role="tabpanel" aria-labelledby="byCity-tab">
          <h4 class="mt-4">Entrer la ville</h4>
             <div class="form-group">
        <label class="text-warning" for="city">Ville:</label>
        <input type="text" class="form-control" id="city" >
         </div>
          </div>
         
         `;

    //button de validation
    const elButton = document.createElement("button");
    elButton.className = "btn btn-warning my-3 form-control";
    elButton.textContent = "Valider";
    elButton.addEventListener("click", this.getWeather.bind(this));

    this.elResultDiv = document.createElement("div");
    this.elResultDiv.className = "mt-3";
    this.elResultDiv.id = "result";

    elDivContainer.append(
      elTabList,
      elTableContent,
      elButton,
      this.elResultDiv
    );

    //on insert dans elApp
    elApp.append(elDivContainer);

    this.elInputNewLat = document.getElementById("latitude");
    this.elInputNewLon = document.getElementById("longitude");
    this.elInputNewCity = document.getElementById("city");

    //ajout du gestionnaire d'evenemùent pour les onglet
    document.querySelectorAll(".nav-link").forEach((tab) => {
      tab.addEventListener("show.bs.tab", () => {
        this.clearFormFields();
      });
    });
    this.clearFormFields;
  }

  //methode pour vidé les champs du form
  clearFormFields() {
    this.elInputNewLat.value = "";
    this.elInputNewLon.value = "";
    this.elInputNewCity.value = "";
  }

  //méthode pour affihcer la météo
  getWeather() {
    let newWeather = {};
    //on récupére sur quelle onglet ont est
    const selectedTab = document.querySelector(".nav-link.active").id;

    if (selectedTab === "byCoord-tab") {
      const newLatitude = this.elInputNewLat.value.trim();
      const newLongitude = this.elInputNewLon.value.trim();
      newWeather = {
        q: "",
        lat: newLatitude,
        lon: newLongitude,
      };
    } else if (selectedTab === "byCity-tab") {
      const newCity = this.elInputNewCity.value.trim();
      newWeather = {
        q: newCity,
        lat: "",
        lon: "",
      };
    }

    this.weatherServiceFr
      .getCurrent(newWeather)
      .then((response) => {
        //TODO: afficher les infos dans le dom
        this.handleServiceReponse(response);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  //methode pour afficher le dom
  handleServiceReponse(ServicesResponse) {
    console.log("response", ServicesResponse);
    if (!ServicesResponse.ok) {
      this.elResultDiv.innerHTML = ``;
      this.elResultDiv.append(this.getErrorDom(ServicesResponse.error));
      return;
    }
    const mainWeather = new MainWeather(ServicesResponse.data);
    this.elResultDiv.innerHTML = ``;
    this.elResultDiv.append(mainWeather.getDom());
  }

  getErrorDom(error) {
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = "";
    errorDiv.className = "alert alert-danger";
    errorDiv.innerHTML = error;
    return errorDiv;

  }
}

const app = new App();

export default app;
