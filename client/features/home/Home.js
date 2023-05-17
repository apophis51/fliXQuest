import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AllMovies from "../Movies/AllMovies";
import { fetchMoviesByGenre } from "../Movies/AllMoviesSlice";
import Genres from "../Genres/Genres";
import MovieTrailer from "../movieTrailer/movieTrailer";

const Home = (props) => {
  const username = useSelector((state) => state.auth.me?.username);
  const dispatch = useDispatch();

  // // useEffect(() => {
  //   // fetch the genres and featured content
  // }, [dispatch, id]);

  return (
    <div>
      <h3>Welcome, {username}</h3>

      <div>
        <Link className="text" to="/movies">
          Movies
        </Link>
        <Link className="text" to="/tvshows">
          TV Shows
        </Link>
      </div>
      <div className="home-container">
        <div className="genres">
          <Genres></Genres>
        </div>
        <div className="App">
          {/* <MovieTrailer></MovieTrailer> */}
        </div>
      </div>

    </div>
  );
};

export default Home;
