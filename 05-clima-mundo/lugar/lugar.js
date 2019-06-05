const axios = require('axios');

const getLugarLatLon = async (direccion) => {
    const encodedUrl = encodeURI(direccion);
    
    const instancia = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        headers: {'X-RapidAPI-Key':'a989d588c7mshabdae2019b05aa9p195780jsnd33433bb24ba'},
    });

    const resp = await instancia.get();

    if(resp.data.Results.length === 0) throw new Error(`No hay resultados para ${direccion}`);

    const data = resp.data.Results[0];
    const lugar = data.name;
    const latitud = data.lat;
    const longitud = data.lon;

    return {
        lugar,
        latitud,
        longitud
    }
}

module.exports = { getLugarLatLon }