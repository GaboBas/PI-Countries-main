const axios = require("axios");
const { Country, Activity } = require("../db.js");

async function getApiCountries() {
  try {
    let countriesApi = await axios.get("https://restcountries.com/v3/all");
    let countries = countriesApi.data.map((c) => {
      if(c.name.common==='Åland Islands') c.name.common = 'Aland Islands';
      return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[0],
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : "No especificado",
        subregion: c.subregion ? c.subregion : "No especificado",
        area: c.area,
        population: c.population,
      };
    });

   await Country.bulkCreate(countries, {
      ignoreDuplicates: true,
    });

  } catch (e) {
    throw Error("Error al crear los paises");
  }
}

module.exports = { getApiCountries };
