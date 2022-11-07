const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db.js");
const { addActivity, getActivities } = require("../connectors/activities");

router.post("/", async (req, res) => {
  let { name, difficulty, duration, season, countries } = req.body;

  try {
    if (!name) throw Error("La actividad debe contener un nombre");
    await addActivity(name, difficulty, duration, season, countries);
    res.status(200).send("Actividad agregada con éxito");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let activities = await getActivities();
    res.status(200).json(activities);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
/* POST /activities:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos, relacionada con los países correspondientes */
