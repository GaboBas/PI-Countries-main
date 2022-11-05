const axios = require('axios');
const { Country, Activities } = require("../db.js");

async function getApiCountries() {

    try{let countriesApi = await axios.get("https://restcountries.com/v3/all");
  
    countriesApi.data.forEach(async (c) => {
      await Country.findOrCreate({
        where: {
          id: c.cca3,
          name: c.name.common,
          flag: c.flags[0],
          continent: c.continents[0],
          capital: c.capital ? c.capital : ["No especificado"],
          subregion: c.subregion ? c.subregion : "No especificado",
          area: c.area,
          population: c.population,
        },
      });
    });}catch(e){
        throw Error('Error al crear los paises')
    }
    
  }

  module.exports = {getApiCountries};