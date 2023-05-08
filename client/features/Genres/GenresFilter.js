/*
import React, { useState } from "react";

const GenresFilter = ({ genres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleClearClick = () => {
    setSelectedGenres([]);
  };

  const filteredGenres = genres?.filter((genre) =>
    selectedGenres.includes(genre.id)
  );

  return (
    <div>
      <div>
        {genres?.map((genre) => (
          <div
            key={genre.id}
            className={`genre ${
              selectedGenres.includes(genre.id) && "selected"
            }`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <div className="clear" onClick={handleClearClick}>
          Clear
        </div>
      )}
      <div>{/* JSX code to display movies based on selected genres }</div>
    </div>
  );
};

export default GenresFilter;
*/