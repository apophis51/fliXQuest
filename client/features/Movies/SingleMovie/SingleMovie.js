import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleMovie, selectSingleMovie } from "./SingleMovieSlice";
import { useParams } from "react-router-dom";

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { movie, loading, error } = useSelector((state) => state.SingleMovie);

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading Movie Information...</div>;
  }

  if (error || !movie) {
    return <div>Error loading movie information.</div>;
  }

  // Add the base URL for the images
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const genres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="single-movie">
      <h1>{movie.title}</h1>
      {/* Update the image src with the correct URL */}
      <img src={imageUrl} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Genres: {genres}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default SingleMovie;
