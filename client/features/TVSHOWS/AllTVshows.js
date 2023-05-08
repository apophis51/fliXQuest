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
    <div>
      <div className="AllTVshows">
        {tvshows.map((tvshow) => (
          <div key={tvshow.id}>
            <Link to={`/tvshows/${tvshow.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                alt={tvshow.name}
              />
              <div>{tvshow.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTVshows;
