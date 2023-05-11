import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTVshows } from "./AllTVshowsSlice";
import { Link } from "react-router-dom";

const AllTVshows = () => {
  const dispatch = useDispatch();
  const tvshowsResponse = useSelector((state) => state.AllTVshows.tvshows);
  const status = useSelector((state) => state.AllTVshows.status);
  const error = useSelector((state) => state.AllTVshows.error);
  const [currentItemNumber, setCurrentItemNumber] = useState(3);

  const handleItemClick = () => {
    num2 = currentItemNumber + 3;
    setCurrentItemNumber(num2);
  };

  const handleItemDelete = () => {
    num2 = currentItemNumber - 3;
    setCurrentItemNumber(num2);
  };

  let num2 = 3;

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

  let num = 0;
  return (
    <div className="movies-container">
      <p className="page-title">All TV Shows</p>
      <div className="categories"></div>
      <div className="AllMovies">
        <div className="carousel-container">
          <div className="carousel-items"></div>
        </div>
      </div>
      <div className="carousel rounded-box">
        <div className="absolute flex justify-between transform -translate-y-1/2 left-12 right-12 top-1/3 text-white">
          <a
            href={"#item" + currentItemNumber}
            className="carousel-item"
            onClick={() => handleItemDelete()}
          >
            ❮
          </a>
          <a
            href={"#item" + currentItemNumber}
            className="carousel-item"
            onClick={() => handleItemClick()}
          >
            ❯
          </a>
        </div>
        {tvshows.map((tvshow) => (
          <div
            className="carousel-item inline-flex"
            id={"item" + num++}
            key={tvshow.id}
          >
            <Link to={`/tvshows/${tvshow.id}`}>
              <div className="inner-box">
                <div className="show-name">
                  <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                    alt={tvshow.title}
                  />
                  <div className="name">{tvshow.title}</div>
                </div>
                <div className="rank-star"></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div id="slide1" className="carousel-item relative w-full">
        \{" "}
      </div>
    </div>
  );
};
export default AllTVshows;
