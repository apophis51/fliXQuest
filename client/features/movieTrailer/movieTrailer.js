import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleMovie, fetchMovieTrailer } from "./movieTrailerSlice";
import { useParams } from "react-router-dom";

const API_URL =
  "https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8";

const MovieTrailer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  const { trailerUrl } = useSelector((state) => state.MovieTrailer);

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
    dispatch(fetchMovieTrailer(id));
    getMovies(API_URL);
  }, [dispatch, id]);

  function getMovies(url) {
    const genreIds = selectedGenre.join(",");
    fetch(`${url}&with_genres=${genreIds}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        if (data.results.length > 0) {
          const firstMovieId = data.results[0].id;
          dispatch(fetchMovieTrailer(firstMovieId));
        }
      });
  }

  // Create the embed URL for the trailer
  const trailerEmbedUrl = trailerUrl
    ? trailerUrl.replace("watch?v=", "embed/")
    : null;

  return (
    <div className="featured-container">
      <div className="trailer-card">
        <h1>Featured Trailer</h1>
        <div>
          {trailerEmbedUrl && (
            <iframe
              width="560"
              height="315"
              src={trailerEmbedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieTrailer;
