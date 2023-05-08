import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "./AllMoviesSlice";
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

  return (
    <div>
      <div className="AllMovies">
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div>{movie.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
