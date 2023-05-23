import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies, fetchMovieById, runGpt} from "../Movies/AllMoviesSlice";
import { Link , useNavigate } from "react-router-dom";

// import { runCompletion } from "./robotSlice"

const SearchResults = () => {
  const dispatch = useDispatch();
  const moviesResponse = useSelector((state) => state.AllMovies.movies);
  const status = useSelector((state) => state.AllMovies.status);
  const error = useSelector((state) => state.AllMovies.error);
  let movieQuery = useSelector((state) => state.Navbar.movieQuery);
  let navbarSearches = useSelector((state) => state.Navbar.navBarQueryCount);
  const navigate = useNavigate();
  const gpt3 = useSelector((state) => state.AllMovies.gptAnswer);

  if (gpt3.length > 0){
    movieQuery = gpt3
    dispatch(fetchMovieById(movieQuery))
    //  navigate(`/`);   //reset to search results
    navigate(`/searchresults`);   
  }


  useEffect(() => {
    // dispatch(fetchAllMovies());
    
    dispatch(fetchMovieById(movieQuery))
    // if (gpt3.length < 0){
    // navigate(`/`)}

  }, [navbarSearches,dispatch] );

  const movieReturn = useSelector((state) => state.AllMovies.movieReturn);
console.log("moviereturn num2 is ", movieReturn)


 let movies =
    moviesResponse && moviesResponse.results
      ? moviesResponse.results
          .filter((movie) => movie.title !== "Undefined")
          .slice(0, 20)
      : [];


  if (movieReturn == 3){
  dispatch(runGpt(movieQuery))

console.log("cool beans")
navigate(`/searchresults`);
  
  return (
    <div className="movies-container">
      <p>Nothin but net</p>
    </div>
  );
  } 

  return (
    
    <div className="movies-container">
      <p className="page-title">All Movies</p>
      <div className="categories">
        {/* <p>Title</p> */}
        {/* <p className="text">Ranking</p> */}
      </div>
      <div className="AllMovies">
        <div className="inner-container">
          {movies.map((movie) => (
            <div className="movies" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <div className="inner-box">
                <div className="show-name">
                  <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="name">{movie.title}</div>
                  </div>
                  <div className="rank-star">
                  <img
                        className="star"
                        src="https://www.supercoloring.com/sites/default/files/styles/drawing_full/public/fif/2017/05/gold-star-paper-craft.png"
                      ></img>
                    <p className="text">
                      {movie.vote_average}
                    </p>
                    </div>
                    <p className="text">{movie.release_date}</p>

                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

