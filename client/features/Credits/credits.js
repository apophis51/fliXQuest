import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCredits } from "./creditsSlice";
import { Link } from "react-router-dom";
import Movies from "../Movies/AllMoviesSlice";
import { useParams } from "react-router-dom";


const AllCredits = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.Credits.status);
  const error = useSelector((state) => state.Credits.error);
  const movienumber = useSelector((state) => state.SingleMovie.id)
  const { id } = useParams();
  const moviesResponse = useSelector((state) => state.Credits.credits.cast); ///////
  console.log(moviesResponse)

  useEffect(() => {
      const credit = dispatch(fetchAllCredits(id));
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


  if (!Array.isArray(moviesResponse) || moviesResponse.length === 0) {
    {
      console.log("message", moviesResponse);
    }
    return <div>No credits found.</div>;
  }

  return (
    <div className="credits-container text-white carousel w-full">
      <p className="page-title">Credits</p>
      <div className="AllCredits"></div>
      {console.log("message 2", moviesResponse)}
      {moviesResponse.map((credits) => (
        <div key={credits.id} className = "carousel-item w-full">
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
