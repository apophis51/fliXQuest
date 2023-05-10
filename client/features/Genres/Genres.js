import React, { useState, useEffect, useRef } from "react";

const API_URL =
  "https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8";


function Genres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  const tagsEl = useRef(null);

  useEffect(() => {
    fetchGenres();
    getMovies(API_URL);
  }, []);

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

  function renderMovies() {
    const filteredMovies =
      selectedGenre.length > 0
        ? movies.filter((movie) =>
            selectedGenre.every((genreId) => movie.genre_ids.includes(genreId))
          )
        : movies;

    return filteredMovies.map((movie) => (
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
    ));
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
