import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTVshow, selectSingleTVshow } from "./SingleTVshowSlice";
import { useParams } from "react-router-dom";

const SingleTVshow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tvshow, error } = useSelector((state) => state.SingleTVshow);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSingleTVshow(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tvshow) {
    return <div>Something went wrong...</div>;
  }

  const imageUrl = tvshow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`
    : null;

  const genres = tvshow.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="single-tvshow">
      <h1>{tvshow.title}</h1>
      {imageUrl ? (
        <img src={imageUrl} alt={tvshow.title} />
      ) : (
        <div>No image available</div>
      )}
      <p>{tvshow.overview}</p>
      <p>Release Date: {tvshow.release_date}</p>
      <p>Genres: {genres}</p>
      <p>Rating: {tvshow.vote_average}</p>
    </div>
  );
};

export default SingleTVshow;
