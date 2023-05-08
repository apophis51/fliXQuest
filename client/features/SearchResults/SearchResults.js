import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    const searchTypes = ["movie", "tv"];
    const results = await Promise.all(
      searchTypes.map(async (searchType) => {
        const response = await fetch(`/api/${searchType}/search/${query}`);
        const data = await response.json();
        return data;
      })
    );
    setSearchResults(results.flat());
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      fetchSearchResults(query);
    }
  }, [location]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {searchResults.map((result, index) => (
            <div key={index}>
              <h2>{result.title || result.name}</h2>
              <p>{result.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
