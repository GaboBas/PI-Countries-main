const { Country, Activity } = require("../db.js");

async function addActivity(name, difficulty, duration, season, countries) {
  let activity = {
    name,
    difficulty,
    duration,
    season,
  };

  try {
    let specials = /[¡!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?]+/;                 //Regular expression para chequear que el nombre no contenga caracteres especiales
    if (specials.test(name))
      throw Error("El nombre no debe contener caractéres especiales.");
    let creAct = await Activity.findOrCreate({
      where: { name },
      defaults: { difficulty, duration, season },
    });
    console.log(creAct);
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
  });
}

module.exports = {
  addActivity,
  getActivities,
};
