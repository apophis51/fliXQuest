import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTVshow, selectSingleTVshow } from "./SingleTVshowSlice";
import { useParams } from "react-router-dom";

const SingleTVshow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tvshow, loading, error } = useSelector((state) => state.SingleTVshow);

  const handleBackButtonClick = () => {
    window.history.back();
  }

  useEffect(() => {
    dispatch(fetchSingleTVshow(id));
  }, [dispatch, id]);
  if (loading) {
    return <div>Loading TV Show Information...</div>;
  }
  if (error || !tvshow) {
    return <div>Error loading TV show information.</div>;
  }
  const imageUrl = `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`;

  return (
    <div className="single-container">
      <div className="single-movie">
        <div className="card">
          <div className="single-title-box">
            <p className="single-movie-title">{tvshow.name}</p>
            <img className="x" src="https://cdn-icons-png.flaticon.com/512/483/483366.png" onClick={handleBackButtonClick}/>
          </div>
          <div className="poster-genre-container">
            <img className="single-poster" src={imageUrl} alt={tvshow.name} />
            <div className="genre-container">
              {tvshow.genres.map((genre) => (
                <div className="genre-bubble2">
                <div>{genre.name}</div>
                </div>
              ))}
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
    </div>
  );
};
export default SingleTVshow;
