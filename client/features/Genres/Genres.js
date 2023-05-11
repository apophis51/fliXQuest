import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


const API_URL =
  "https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  // added
  const [currentItemNumber, setCurrentItemNumber] = useState(1);
  const [numOfItems, setNumOfItems] = useState(0);
  const tagsEl = useRef(null);

  useEffect(() => {
    fetchGenres();
    getMovies(API_URL);
  }, []);

  // added
  useEffect(() => {
    setNumOfItems(movies.length);
  }, [movies]);

  function fetchGenres() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=1cf50e6248dc270629e802686245c2c8"
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }

  function getMovies(url) {
    const genreIds = selectedGenre.join(",");
    fetch(`${url}&with_genres=${genreIds}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }

  function handleGenreSelect(genreId) {
    if (selectedGenre.includes(genreId)) {
      setSelectedGenre(selectedGenre.filter((id) => id !== genreId));
    } else {
      setSelectedGenre([...selectedGenre, genreId]);
    }
  }

  function clearSelection() {
    setSelectedGenre([]);
  }

  function renderGenres() {
    return genres.map((genre) => (
      <div
        key={genre.id}
        className={`tag ${selectedGenre.includes(genre.id) ? "highlight" : ""}`}
        onClick={() => handleGenreSelect(genre.id)}
      >
        {genre.name}
      </div>
    ));
  }

  // added
  const handleItemClick = () => {
    num2 = currentItemNumber + 3;
    setCurrentItemNumber(num2);
  };
  // added
  const handleItemDelete = () => {
    num2 = currentItemNumber - 3;
    setCurrentItemNumber(num2);
  };
  // added
  let num2 = 3;

  function renderMovies() {
    const filteredMovies =
      selectedGenre.length > 0
        ? movies.filter((movie) =>
            selectedGenre.every((genreId) => movie.genre_ids.includes(genreId))
          )
        : movies;

    let num = 0;


    return (
      <div className="movies-container">
        <p className="page-title">All Movies</p>
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
          {filteredMovies.map((movie) => (
            <div
              className="carousel-item inline-flex"
              id={"item" + num++}
              key={movie.id}
            >
              <Link to={`/movies/${movie.id}`}>
                <div className="inner-box">
                  <div className="home-container">
                    <div className="show-name">
                      <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <span className="vote-average">{movie.vote_average}</span>
                    </div>
                  </div>
                  <div className="overview">
                    <h3>Overview:</h3>
                    {movie.overview}
                  </div>
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
  }

  return (
    <div className="MovieApp">
      <div className="tags" ref={tagsEl}>
        {renderGenres()}
        {selectedGenre.length > 0 && (
          <div className="tag clear highlight" onClick={clearSelection}>
            Clear x
          </div>
        )}
      </div>
      <div className="movies">{renderMovies()}</div>
    </div>
  );
}

export default Genres;

// First Version that works with genres, overview, and single movie / no carousel

// return filteredMovies.map((movie) => (
//       <div key={movie.id} className="movie">
//         {/* added */}
//         <div key={movie.id} className="carousel-item inline-flex">
//           <Link to={`/movies/${movie.id}`}>
//             <div className="inner-box">
//               <div className="show-name">
//                 <img
//                   className="movie-poster"
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   alt={movie.title}
//                 />
//                 {/* <div className="name">{movie.title}</div> */}
//               </div>
//               <div className="rank-star"></div>
//             </div>
//           </Link>
//         </div>
//         {/* <img
//           src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
//           alt={movie.title}
//         /> */}
//         <div className="movie-info">
//           <h3>{movie.title}</h3>
//           <span className="vote-average">{movie.vote_average}</span>
//         </div>
//         <div className="overview">
//           <h3>Overview:</h3>
//           {movie.overview}
//         </div>
//       </div>
//     ));
//   }

{
  /* <div className="movie-info">
          <h3>{movie.title}</h3>
          <span className="vote-average">{movie.vote_average}</span>
        </div>
        <div className="overview">
          <h3>Overview:</h3>
          {movie.overview}
        </div> */
}

// return (
//       <div className="movies-container">
//         <p className="page-title">All Movies</p>
//         <div className="categories"></div>
//         <div className="AllMovies">
//           <div className="carousel-container">
//             <div className="carousel-items"></div>
//           </div>
//         </div>
//         <div className="carousel rounded-box">
//           <div className="absolute flex justify-between transform -translate-y-1/2 left-12 right-12 top-1/3 text-white">
//             <a
//               href={"#item" + currentItemNumber}
//               className="carousel-item"
//               onClick={() => handleItemDelete()}
//             >
//               ❮
//             </a>
//             <a
//               href={"#item" + currentItemNumber}
//               className="carousel-item"
//               onClick={() => handleItemClick()}
//             >
//               ❯
//             </a>
//           </div>
//           {filteredMovies.map((movie) => (
//             <div
//               className="carousel-item inline-flex"
//               id={"item" + num++}
//               key={movie.id}
//             >
//               <Link to={`/movies/${movie.id}`}>
//                 <div className="inner-box">
//                   <div className="show-name">
//                     <img
//                       className="movie-poster"
//                       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                       alt={movie.title}
//                     />
//                   </div>
//                   <div className="movie-info">
//                     <h3>{movie.title}</h3>
//                     <span className="vote-average">{movie.vote_average}</span>
//                   </div>
//                   <div className="overview">
//                     <h3>Overview:</h3>
//                     {movie.overview}
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//         <div id="slide1" className="carousel-item relative w-full">
//           \{" "}
//         </div>
//       </div>
//     );
//   }
