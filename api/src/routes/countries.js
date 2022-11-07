const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country, Activity } = require("../db.js");
const { getApiCountries } = require("../connectors/countries.js");

let fillDb = false; //Para que sólo intente llenar la base de datos la primera vez que corre el servidor

router.get("/", async (req, res) => {
  let { name } = req.query; //Buscar por nombre

  try {
    if (!fillDb) {
      await getApiCountries();
      fillDb = true;
    }

    if (name) {
      name = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1); //Capitalizo la primera letra del nombre y en minusculas el resto para que la búsqueda no sea tan estricta
      let country = await Country.findOne({
        where: {
          name,
        },
      });

      res.status(200).json(country);
    } else {
      let countries = await Country.findAll({
        attributes: ["name", "flag", "continent"],
      });

      res.status(200).json(countries);
    }
  } catch (e) {
    res.status(401).send(e.message);
  }
});

//Buscar por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.length !== 3) {
      throw Error("ID inválido");
    }
    let country = await Country.findByPk(id.toUpperCase(), {
      attributes: ["name", "id", "capital", "subregion", "area", "population"],
      include: [
        {
          model: Activity,
          attributes: { exclude: ["id"] },
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!country) throw Error("No se encontró ningún país con esa ID");
    res.status(200).json(country);
  } catch (e) {
    res.status(401).send(e.message);
  }
});

module.exports = router;
