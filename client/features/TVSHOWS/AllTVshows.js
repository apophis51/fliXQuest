import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTVshows } from "./AllTVshowsSlice";
import { Link } from "react-router-dom";

const AllTVshows = () => {
  const dispatch = useDispatch();
  const tvshowsResponse = useSelector((state) => state.AllTVshows.tvshows);
  const status = useSelector((state) => state.AllTVshows.status);
  const error = useSelector((state) => state.AllTVshows.error);

  useEffect(() => {
    dispatch(fetchAllTVshows());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const tvshows =
    tvshowsResponse && tvshowsResponse.results
      ? tvshowsResponse.results
          .filter((tvshow) => tvshow.name !== "Undefined")
          .slice(0, 20)
      : [];

  if (!Array.isArray(tvshows) || tvshows.length === 0) {
    return <div>No TV shows found.</div>;
  }

  return (
    <div className="movies-container">
      <p className="page-title">All Movies</p>
      <div className="categories">
        {/* <p>Title</p> */}
        {/* <p className="text">Ranking</p> */}
        <p id="release-date" className="text">Release Date</p>
        </div>
        <div className="AllMovies">
      <div className="inner-container">
        {tvshows.map((tvshow) => (
          <div className="movies" key={tvshow.id}>
            <Link to={`/tvshows/${tvshow.id}`}>
            <div className="inner-box">
              <div className="show-name">
              <img
              className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                alt={tvshow.name}
              />
              <div className="name">{tvshow.name}</div>
              </div>
            <div className="rank-star">
                  <img
                        className="star"
                        src="https://www.supercoloring.com/sites/default/files/styles/drawing_full/public/fif/2017/05/gold-star-paper-craft.png"
                      ></img>
                    <p className="text">
                      {tvshow.vote_average}
                    </p>
                    </div>
                    <p className="text">{tvshow.first_air_date}</p>
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AllTVshows;
