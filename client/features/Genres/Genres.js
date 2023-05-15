import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


const API_URL =
  "https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8";

function Genres() {
  // o: all of this could be done easier in redux
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

    // o: why are these not being done in a thunk in a slice?
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

  // o: this may be better as a component
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


  // o: remove if not being used
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

  // o: this may be better as a component
  function renderMovies() {
    const filteredMovies =
      selectedGenre.length > 0
        ? movies.filter((movie) =>
            selectedGenre.every((genreId) => movie.genre_ids.includes(genreId))
          )
        : movies;

    let num = 0;


    return (
      <div className="home-container">
        <p className="page-title">Featured Movies:</p>
        <div className="categories"></div>
        <div className="AllMovies">
          <div className="carousel-container">
            <div className="carousel-items"></div>
          </div>
        </div>
        <div className="carousel rounded-box">
          {filteredMovies.map((movie) => (
            <div
              className="carousel-item inline-flex"
              id={"item" + num++}
              key={movie.id}
            >
              <Link to={`/movies/${movie.id}`}>
                <div key={movie.id} className="movie">
                  <img
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <span className="vote-average">{movie.vote_average}</span>
                  </div>
                  <div className="overview">
                    <h3>Overview</h3>
                    {movie.overview}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div id="slide1" className="carousel-item relative w-full">
          {" "}
        </div>
      </div>
    );
  }

  return (
    <div className="MovieApp">
      <div className="tags" ref={tagsEl}>
        <div>Browse By Genre:</div>
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
