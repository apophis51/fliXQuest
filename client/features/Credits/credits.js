import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCredits } from "./creditsSlice";
import { Link } from "react-router-dom";
import Movies from "../Movies/AllMoviesSlice";

const AllCredits = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.Credits.status);
  const error = useSelector((state) => state.Credits.error);
  const moviesResponse = useSelector((state) => state.Credits.cast);

  useEffect((id) => {
      const credit = dispatch(fetchAllCredits(713704));
      console.log(credit);
    },
    [dispatch]
  );
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // const movies =
  //   moviesResponse && moviesResponse.results
  //     ? moviesResponse.results
  //         .filter((movie) => movie.title !== "Undefined")
  //         .slice(0, 20)
  //         .map((movie) => {
  //           return {
  //             ...movie,
  //             overview: movie.overview || "No overview available.",
  //           };
  //         })
  //     : [];

  if (!Array.isArray(moviesResponse) || moviesResponse.length === 0) {
    {
      console.log("message", moviesResponse);
    }
    return <div>No credits found.</div>;
  }

  return (
    <div className="credits-container">
      <p className="page-title">Credits</p>
      <div className="AllCredits"></div>
      {console.log("message 2", moviesResponse)}
      {moviesResponse.map((credits) => (
        <div key={credits.id}>
          <div key={credits.id} className="credits">
            <img
              src={`https://image.tmdb.org/t/p/w500/${credits.profile_path}`}
              alt={credits.name}
            />

            <div className="credit-name">
              <h3>{credits.name}</h3>
            </div>

            <div className="character">
              <h3>Character</h3>
              {credits.character}
            </div>

            {/* <div className="character">
              <h3>Character</h3>
              {credits.character}
            </div>

            <div className="character">
              <h3>Character</h3>
              {credits.character}
            </div> */}

          </div>
        </div>
      ))}
    </div>
  );
};
export default AllCredits;
