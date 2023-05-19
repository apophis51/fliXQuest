const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

router.get("/:id", async (req, res, next) => {
  try {
    const apiKey = process.env.api_key;
    const cast = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/movie/${req.params.id}/credits?api_key=${apiKey}`
    );
    console.log(cast.data);

    // https://api.themoviedb.org/3/movie/713704/credits?api_key=1cf50e6248dc270629e802686245c2c8

    res.json(cast.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
