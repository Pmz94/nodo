const axios = require('axios');

const getClima = async (lat, lon) => {
    const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=42e1d485140bda1d5249d30f4ee6c506`);
    return respuesta.data.main.temp;
}

module.exports = { getClima }