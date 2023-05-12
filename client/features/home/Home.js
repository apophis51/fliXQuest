import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AllMovies from "../Movies/AllMovies";
import { fetchMoviesByGenre } from "../Movies/AllMoviesSlice";
import Genres from "../Genres/Genres";

const Home = (props) => {
  const username = useSelector((state) => state.auth.me?.username);
  const dispatch = useDispatch();
  const { id } = useParams();
  const genres = useSelector((state) => state.genres);
  const featuredMovies = useSelector((state) => state.featured?.movies);
  const featuredTVShows = useSelector((state) => state.featured?.tvShows);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // fetch the genres and featured content
  }, [dispatch, id]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    dispatch(fetchMoviesByGenre(genreId));
  };

  return (
    <div>

      <h3>Welcome, {username}</h3>
      <div>
        {genres &&
          genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                selectedGenre === genre.id ? "bg-blue-700" : ""
              }`}
            >
              {genre.name}
            </button>
          ))}
      </div>
      <h4>Featured Movies Today</h4>
      <ul>

        {featuredMovies &&
          featuredMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
      </ul>
      <h4 className="text">Featured TV Shows Today</h4>
      <ul className="text">
        {featuredTVShows &&
          featuredTVShows.map((show) => <li key={show.id}>{show.title}</li>)}
      </ul>

      <div>
        <Link className="text" to="/movies">Movies</Link>
        <Link className="text" to="/tvshows">TV Shows</Link>
      </div>
      <div className="genres">
        <Genres></Genres>
      </div>
      {/* <div className="movie-container">
        <div className="card">
          <AllMovies genreId={selectedGenre} />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
