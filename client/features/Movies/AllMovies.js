import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies, fetchMoviesByGenre } from "./AllMoviesSlice";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const dispatch = useDispatch();
  const moviesResponse = useSelector((state) => state.AllMovies.movies);
  const status = useSelector((state) => state.AllMovies.status);
  const error = useSelector((state) => state.AllMovies.error);

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const movies =
    moviesResponse && moviesResponse.results
      ? moviesResponse.results
          .filter((movie) => movie.title !== "Undefined")
          .slice(0, 20)
      : [];

  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>No movies found.</div>;
  }

  const genres =
    moviesResponse && moviesResponse.genres ? moviesResponse.genres : [];

  return (
    <div className="movies-container">
      <p className="page-title">All Movies</p>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(fetchAllMovies())}
        >
          All
        </button>
      </div>
      <div>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => dispatch(fetchMoviesByGenre(genre.id))}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="categories">
        {/* <p>Title</p> */}
        {/* <p className="text">Ranking</p> */}
        <p id="release-date" className="text">
          Release Date
        </p>
      </div>
      <div className="AllMovies">
        <div className="inner-container">
          {movies.map((movie) => (
            <div className="movies" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <div className="inner-box">
                  <div className="show-name">
                    <img
                      className="movie-poster"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="name">{movie.title}</div>
                  </div>
                  <div className="rank-star">
                    <img
                      className="star"
                      src="https://www.supercoloring.com/sites/default/files/styles/drawing_full/public/fif/2017/05/gold-star-paper-craft.png"
                    ></img>
                    <p className="text">{movie.vote_average}</p>
                  </div>
                  <p className="text">{movie.release_date}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
