class HttpUtils{
    //on va crée une methode qui permet de construire une URL à partir d'une URL de base et de parametre 
    static buildUrl(baseUrl, params= {}){
        
        let paramsKey = Object.keys(params);

        if(paramsKey.length <=0)return baseUrl

        let paramsArray = [];

        for(let key in params){
            let pairedParam = `${key}=${params[key]}`;

            paramsArray.push(pairedParam);

     

        }
        return `${baseUrl}?${paramsArray.join('&')}`
    }
}

export default HttpUtils;