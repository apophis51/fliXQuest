import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "./AllMoviesSlice";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const dispatch = useDispatch();
  const moviesResponse = useSelector((state) => state.AllMovies.movies);
  const status = useSelector((state) => state.AllMovies.status);
  const error = useSelector((state) => state.AllMovies.error);

  function numberClicker() {
    num2++
  }

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
  let num = 0;
  let num2 = 5;
  return (
    <div className="movies-container">
      <p className="page-title">All Movies</p>
      <div className="categories"></div>
      <div className="AllMovies">
        <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
            <a href="#item1" className="btn btn-circle">❮</a>
            </div>
          </div>
          </div>
          <div className="carousel rounded-box">
          {movies.map((movie) => (
            <div id={"item" + num++} className="carousel-item " key={movie.id}>
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
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div id="slide1" className="carousel-item relative w-full">
            <a href={"#item" + num2} onClick={numberClicker()} className="btn btn-circle">❯</a>
            </div>
        </div>
  );
};

export default AllMovies;
