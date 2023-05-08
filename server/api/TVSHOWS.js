const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");
const TVshow = require("../db/models/TVSHOWS");

dotenv.config();

router.get("/", async (req, res, next) => {
  try {
    const apiKey = process.env.api_key;
    const tvshows = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/discover/tv?api_key=${apiKey}`
    );
    console.log(tvshows.data);

    res.json(tvshows.data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiKey = process.env.api_key;
    const tvshow = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tv/${req.params.id}?api_key=${apiKey}`
    );
    console.log(tvshow.data);

    res.json(tvshow.data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTVshow = await TVshow.create(req.body);
    res.json(newTVshow);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const tvshow = await TVshow.findByPk(req.params.id);
    await tvshow.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
