const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country, Activities } = require("../db.js");
const {getApiCountries} = require('../connectors/countries.js')

let fillDb = false; //Para que sólo intente llenar la base de datos la primera vez que corre el servidor

/* async function getApiCountries() {
  let countriesApi = await axios.get("https://restcountries.com/v3/all");

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
  });
} */

router.get("/", async (req, res) => {
  try {
    if (!fillDb) {
      await getApiCountries();
      fillDb = true;
    }

    let countries = await Country.findAll({
      attributes: ["name", "flag", "continent"],
    });

    res.status(200).json(countries);
  } catch (e) {
    res.status(401).send(e.message);
  }
});

module.exports = router;

/* GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
Obtener un listado de los paises.
 GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes
 GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado */
