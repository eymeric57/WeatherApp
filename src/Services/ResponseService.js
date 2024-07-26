class ResponseService {
    ok; //bool => renvoi tru si la reponse est "ok"
    error; // si la propriété "ok" est false, on renvoie ojet erreur 
    data; // si la propriété "ok" est true, on renvoie l'objet de donnée


    constructor(ok, error, data) {
        this.ok = ok;
        this.error = error;
        this.data = data;
    }

}

export default ResponseService