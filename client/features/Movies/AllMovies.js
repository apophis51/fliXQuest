import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "./AllMoviesSlice";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const dispatch = useDispatch();
  const moviesResponse = useSelector((state) => state.AllMovies.movies);
  const status = useSelector((state) => state.AllMovies.status);
  const error = useSelector((state) => state.AllMovies.error);
  const [currentItemNumber, setCurrentItemNumber] = useState(3);

  const handleItemClick = () => {
    num2 = currentItemNumber + 3;
    setCurrentItemNumber(num2);
  };

  const handleItemDelete = () => {
    num2 = currentItemNumber - 3;
    setCurrentItemNumber(num2);
  };


  let num2 = 3;

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
          .map((movie) => {
            return {
              ...movie,
              overview: movie.overview || "No overview available.",
            };
          })
      : [];

  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>No movies found.</div>;
  }
  let num = 0;
  return (
    <div className="movies-container">
      <p className="page-title">All Movies</p>
      <div className="categories"></div>
      <div className="AllMovies">
        <div className="carousel-container">
          <div className="carousel-items"></div>
        </div>
      </div>
      <div className="carousel rounded-box">
        <div className="absolute flex justify-between transform -translate-y-1/2 left-12 right-12 top-1/3 text-white">
          <a
            href={"#item" + currentItemNumber}
            className="carousel-item"
            onClick={() => handleItemDelete()}
          >
            ❮
          </a>
          <a
            href={"#item" + currentItemNumber}
            className="carousel-item"
            onClick={() => handleItemClick()}
          >
            ❯
          </a>
        </div>
        {movies.map((movie) => (
          <div
            className="carousel-item inline-flex"
            id={"item" + num++}
            key={movie.id}
          >
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
                <div className="rank-star"></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div id="slide1" className="carousel-item relative w-full">
        \{" "}
      </div>
    </div>
  );
};
export default AllMovies;
