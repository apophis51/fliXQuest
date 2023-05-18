import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleMovie,
  fetchMovieTrailer,
  selectSingleMovie,
} from "./SingleMovieSlice";
import { useParams } from "react-router-dom";


import Map from "../../Map/Map";

import AllTVshows from "../../TVSHOWS/AllTVshows";
import BackButton from "../../../features/BackButton";

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { movie, loading, error, trailerUrl } = useSelector(
    (state) => state.SingleMovie
  );

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
    dispatch(fetchMovieTrailer(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading Movie Information...</div>;
  }
  if (error || !movie) {
    return <div>Error loading movie information.</div>;
  }
  // Add the base URL for the images
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // Create the embed URL for the trailer
  const trailerEmbedUrl = trailerUrl
    ? trailerUrl.replace("watch?v=", "embed/")
    : null;

  return (
    <div className="single-container">
      <div className="single-movie">
        <div className="card">
          <div className="single-title-box">
            <p className="single-movie-title">{movie.title}</p>
            <BackButton />
          </div>
          <div className="trailer-box">
            <div className="poster-genre-container">
              <img className="single-poster" src={imageUrl} alt={movie.title} />
              <div className="genre-container">
                {movie.genres.map((genre) => (
                  <div className="genre-bubble" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="trailer-box-container">
                {trailerEmbedUrl && (
                  <iframe
                    className="trailer-embed"
                    width="560"
                    height="315"
                    src={trailerEmbedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
          <p id="overview" className="text">
            {movie.overview}
          </p>

          <p className="text">Released - {movie.release_date}</p>
          <div className="rank-star">
            <img
              className="star"
              src="https://www.supercoloring.com/sites/default/files/styles/drawing_full/public/fif/2017/05/gold-star-paper-craft.png"
              alt="Star"
            />
            <p className="text">{movie.vote_average}/10</p>
          </div>
        </div>
      </div>
      <Map />
    </div>
  );
};
export default SingleMovie;
