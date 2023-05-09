// o: explain
/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchGenres } from "./GenresSlice";
import GenresFilter from "./GenresFilter";

const Genres = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(fetchGenres(id));
  }, [dispatch, id]);

  return (
    <div>
      <GenresFilter genres={genres} />
    </div>
  );
};

export default Genres;
*/
