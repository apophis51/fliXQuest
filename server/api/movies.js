const router = require("express").Router();
const axios = require('axios')
process.env = require('dotenv').config().parsed;


// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const searchURL = BASE_URL + '/search/movie?'+API_KEY;
https://developers.themoviedb.org/3/getting-started/search-and-query-for-details


router.get("/:movieName", async (req, res, next) => {
    try {
      // in the query name must parse a movie with a + sign {Jack+Reacher} as an input for example
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.api_key}&query=${req.params.movieName}`);
      console.log(response.data)
  
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  });

// router.get("/data/:applicationId", async (req, res, next) => {
//   try {
//     // const application = await JobApplications.findByPk(req.params.applicationId);
//     const response = await axios.get(`https://app.amattendees.com/v2/getdata.php?query=${req.params.applicationId}&intent=all`);
//     console.log(response.data)

//     res.json(response.data);
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;
