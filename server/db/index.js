//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const movies = require("./models/Movies");
const TVSHOWS = require("./models/TVSHOWS");


//associations could go here!
User.hasMany(movies);
movies.belongsTo(User);

User.hasMany(TVSHOWS);
TVSHOWS.belongsTo(User);


module.exports = {
  db,
  models: {
    User,
    movies,
    TVSHOWS,
  },
};
