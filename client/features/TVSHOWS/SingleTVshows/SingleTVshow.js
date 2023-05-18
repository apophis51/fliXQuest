import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleTVshow,
  fetchTVShowTrailer,
  selectSingleTVshow,
} from "./SingleTVshowSlice";
import { useParams } from "react-router-dom";

import BackButton from "../../../features/BackButton";
import Map from "../../Map/TVMap";

const SingleTVshow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tvshow, loading, error, trailerUrl } = useSelector(
    (state) => state.SingleTVshow
  );
  useEffect(() => {
    dispatch(fetchSingleTVshow(id));
    dispatch(fetchTVShowTrailer(id));
  }, [dispatch, id]);
  if (loading) {
    return <div>Loading TV Show Information...</div>;
  }
  if (error || !tvshow) {
    return <div>Error loading TV show information.</div>;
  }
  const imageUrl = `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`;
  const trailerEmbedUrl = trailerUrl
    ? trailerUrl.replace("watch?v=", "embed/")
    : null;
  return (
    <div className="single-container">
      <div className="single-movie">
        <div className="card">
            <div className="single-title-box">
              <p className="single-movie-title">{tvshow.name}</p>
              <BackButton />
            </div>
            
            <div className="trailer-box">
            <div className="poster-genre-container">
              <img className="single-poster" src={imageUrl} alt={tvshow.name} />
              <div className="genre-container">
                {tvshow.genres.map((genre) => (
                  <div className="genre-bubble2" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          <div>
          <div className="trailer-box-container">
              {trailerEmbedUrl && (
                <iframe className="trailer-embed"
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
            {tvshow.overview}
          </p>
          <p className="text">First Aired - {tvshow.first_air_date}</p>
          <div className="rank-star">
            <img
              className="star"
              src="https://www.supercoloring.com/sites/default/files/styles/drawing_full/public/fif/2017/05/gold-star-paper-craft.png"
            />
            <p className="text">{tvshow.vote_average}/10</p>
          </div>
        </div>
      </div>

      <Map />

    </div>
  );
};
export default SingleTVshow;
