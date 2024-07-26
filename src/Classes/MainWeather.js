import Main from "./Main";
import Sun from "./Sun";
import Weather from "./Weather";
import Wind from "./Wind";

const iconCDN = 'https://openweathermap.org/img/wn/'; // URL de base pour les icônes météo

class MainWeather {
  // Déclaration des propriétés de la classe
  clouds;
  dt;
  main;
  rain;
  snow;
  sun;
  visibility;
  weather;
  wind;
 

  // Constructeur qui initialise les propriétés avec les données fournies
  constructor(mainWeatherLiteral) {
    this.clouds = mainWeatherLiteral.clouds.all; // Pourcentage de couverture nuageuse
    this.dt = mainWeatherLiteral.dt; // Date et heure de la donnée (timestamp)
    this.main = new Main(mainWeatherLiteral.main); // Instance de la classe Main pour les données principales

 

    // Si des données de pluie sont disponibles, les récupérer
    if (mainWeatherLiteral.hasOwnProperty('rain')) {
      this.rain = mainWeatherLiteral.rain['1h']; // Précipitations de pluie sur la dernière heure
    }

    // Si des données de neige sont disponibles, les récupérer
    if (mainWeatherLiteral.hasOwnProperty('snow')) {
      this.snow = mainWeatherLiteral.snow['1h']; // Précipitations de neige sur la dernière heure
    }

    // Création de l'instance Sun avec les données de lever et coucher de soleil
    this.sun = new Sun({
      sunset: mainWeatherLiteral.sys.sunset,
      sunrise: mainWeatherLiteral.sys.sunrise,
      timezone: mainWeatherLiteral.timezone

    });

    this.visibility = mainWeatherLiteral.visibility; // Visibilité en mètres

    // Création de l'instance Weather avec les données de météo actuelles
    this.weather = new Weather({
      description: mainWeatherLiteral.weather[0].description,
      icon: mainWeatherLiteral.weather[0].icon,
      locationName: mainWeatherLiteral.name,
      country: mainWeatherLiteral.sys.country
    });

    this.wind = new Wind(mainWeatherLiteral.wind); // Instance de la classe Wind pour les données de vent
  }

  // Méthode pour créer et retourner l'élément DOM représentant les données météo
  getDom() {
    const resultDiv = document.getElementById('result'); // Conteneur principal pour l'affichage des résultats

    // Création des éléments pour les onglets
    const tab1 = document.createElement('div');
    tab1.className = "tab-pane fade show active";
    tab1.id = 'tab1';
    tab1.setAttribute('role', 'tabpanel');
    tab1.setAttribute('aria-labelledby', 'tab1-tab');
    tab1.innerHTML = `<h5 class="card-title">Informations générales</h5>`;
    tab1.append(this.weather.getDom());

    const tab2 = document.createElement('div');
    tab2.className = "tab-pane fade";
    tab2.id = 'tab2';
    tab2.setAttribute('role', 'tabpanel');
    tab2.setAttribute('aria-labelledby', 'tab2-tab');
    tab2.innerHTML = `<h5 class="card-title">Températures</h5>`;
    tab2.append(this.main.getDom());

    const tab3 = document.createElement('div');
    tab3.className = "tab-pane fade";
    tab3.id = 'tab3';
    tab3.setAttribute('role', 'tabpanel');
    tab3.setAttribute('aria-labelledby', 'tab3-tab');
    tab3.innerHTML = `<h5 class="card-title">Info sur le vent</h5>`;
    tab3.append(this.wind.getDom());

    const tab4 = document.createElement('div');
    tab4.className = "tab-pane fade";
    tab4.id = 'tab4';
    tab4.setAttribute('role', 'tabpanel');
    tab4.setAttribute('aria-labelledby', 'tab4-tab');
    tab4.innerHTML = `<h5 class="card-title">Info sur le soleil</h5>`;
    tab4.append(this.sun.getDom());

    const tab5 = document.createElement('div');
    tab5.className = "tab-pane fade";
    tab5.id = 'tab5';
    tab5.setAttribute('role', 'tabpanel');
    tab5.setAttribute('aria-labelledby', 'tab5-tab');
    this.rain ?
      tab5.innerHTML = `
            <h5 class="card-title">Précipitations</h5>
            <div class="d-flex">
                <i class="bi bi-cloud-drizzle mx-2"></i>
                <p>Cumule de pluie : ${this.rain} mm</p> 
            </div>`
      :
      tab5.innerHTML = `
            <h5 class="card-title">Précipitations</h5>
            <div class="d-flex">
                <i class="bi bi-snow2 mx-2"></i>
                <p>Cumule de neige : ${this.snow} mm</p> 
            </div>`;

    // Création de l'élément pour la liste des onglets
    const tabList = document.createElement('ul');
    tabList.className = "nav nav-tabs card-header-tabs ms-0";
    tabList.id = "myTabs";
    tabList.setAttribute('role', 'tablist');
    tabList.innerHTML = `
            <li class="nav-item" role="presentation">
                <a class="nav-link text-warning fw-bold active" id="tab1-tab" data-bs-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Général</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link text-warning fw-bold" id="tab2-tab" data-bs-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Températures</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link text-warning fw-bold" id="tab3-tab" data-bs-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Vent</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link text-warning fw-bold" id="tab4-tab" data-bs-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Soleil</a>
            </li>
        `;

    // Ajout d'un onglet pour les précipitations si des données de pluie ou de neige sont disponibles
    if (this.rain || this.snow) {
      tabList.innerHTML += `
            <li class="nav-item" role="presentation">
                <a class="nav-link text-warning fw-bold" id="tab5-tab" data-bs-toggle="tab" href="#tab5" role="tab" aria-controls="tab5" aria-selected="false">Précipitations</a>
            </li>
            `;
    }

    // Création de l'élément pour le contenu des onglets
    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
                ${tab1.outerHTML}
                ${tab2.outerHTML}
                ${tab3.outerHTML}
                ${tab4.outerHTML}
                ${tab5.outerHTML}
            </div>
        `;

    // Création de l'élément pour la carte
    const card = document.createElement('div');
    card.className = "card h-100";
    card.append(tabList, cardBody);

    // Création de l'élément pour le conteneur de la carte
    const cardContainer = document.createElement('div');
    cardContainer.className = "container mt-4";
    cardContainer.innerHTML = `
            <div class="row justify-content-center">
                <div class="col-12 ">
                </div>
            </div>
        `;
    cardContainer.querySelector('.col-12').append(card);

    // Mise à jour du conteneur principal avec la nouvelle carte
    resultDiv.innerHTML = '';
    resultDiv.append(cardContainer);
    return cardContainer;
  }
}

export default MainWeather;