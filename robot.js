const { Configuration, OpenAIApi } = require("openai");
// process.env = 
require('dotenv').config().parsed;

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY
});
const openai = new OpenAIApi(configuration);

//This movie input represents what would be input from the search bar
let movieinput = 'a scifi and romance movie'
///

//GPT will be following this prompot to generate the results
let searchprompt = `search for a movie that matches the following: ${movieinput}and give me the movie title by itseslf
Give 5 Suggestions seperated by commas`

//We need to run this funciton OnClick from the search bar
async function runCompletion() {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: searchprompt
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();


