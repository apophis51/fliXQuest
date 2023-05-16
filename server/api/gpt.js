const router = require("express").Router();

const axios = require("axios");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.open_api_key
});
const openai = new OpenAIApi(configuration);

//This movie input represents what would be input from the search bar
let movieinput = 'a scifi and romance movie'
///

//GPT will be following this prompot to generate the results
let searchprompt = `search for a movie that matches the following: ${movieinput}and give me the movie title by itseslf
Give 5 Suggestions seperated by commas`


router.get("/:query", async (req, res, next) => {
  try {
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: req.params.query
        prompt: `find me a movie about ${req.params.query} and give me the title only and no punctuation`
    });
    console.log(completion.data.choices[0].text);

    res.json(completion.data.choices[0].text);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
