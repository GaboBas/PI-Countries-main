const { Country, Activity } = require("../db.js");

async function addActivity(name, difficulty, duration, season, countries) {
  let activity = {
    name,
    difficulty,
    duration,
    season,
  };

    let specials = /[¡!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?]+/;                 //Regular expression para chequear que el nombre no contenga caracteres especiales
    try{
    if (specials.test(name))
      throw Error("El nombre de la actividad no debe contener caracteres especiales");
    if(!name) 
      throw Error("La actividad debe tener un nombre")
    if(duration < 0 || duration > 24) {
      throw Error("La duración debe ser entre 0 y 24 horas");
    }
    if(difficulty < 1 || difficulty > 5 ) {
      throw Error("La dificultad debe ser entre 1 y 5");
    }
    let creAct = await Activity.findOrCreate({
      where: { name },
      defaults: { difficulty, duration, season },
    });
    await creAct[0].setCountries(countries);
} catch (e) {
    throw Error(e.message);
  }
}

async function getActivities() {
  return await Activity.findAll({
    attributes: {
      exclude: ["id"],
    },
    include: [
      {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
}

module.exports = {
  addActivity,
  getActivities,
};
