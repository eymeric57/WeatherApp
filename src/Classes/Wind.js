class Wind {
  //properties
  speed;
  deg;
  gust;

  //constructor
  constructor(windData) {
    this.speed = windData.speed;
    this.deg = windData.deg;
    this.gust = windData.gust;
  }

  //méthode pour obtenir la direction cardinal du vent
  getDirection() {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    const index = Math.round(this.deg / 45);
    return directions[index];
  }

  getDom() {
    const wind = document.createElement("div");
    wind.innerHTML = `
        <div class="d-flex flex-column">
        <div class="d-flex align-items-center">
        <i class="bi bi-speedometer2 mx-2"></i>
        <span>Vitesse: ${Math.floor(this.speed * 3.6)} km/h</span>
        
        
        
        </div>
        <div class="d-flex align-items-center">
        <i class="bi bi-compass mx-2"></i>
        <span>Vitesse: ${this.getDirection(this.deg)} </span>
        
        
        
        </div>
        </div>
        `;

        //si il y a des rafales ont les affihce 
        if(this.gust){
            const gust = document.createElement("div");
            gust.innerHTML = `
            <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
            <i class="bi bi-wind mx-2"></i>
            <span>Rafales: ${Math.floor(this.gust * 3.6)} km/h</span>
            
            
            
            </div>
            </div>
            `;
            wind.appendChild(gust);
        }
        return wind;
  }
}

export default Wind;
