import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
/*import { fetchGenres } from "./GenresSlice";
import { fetchFeaturedMovies, fetchFeaturedTVShows } from "./FeaturedSlice";
*/
/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me?.username);
  const dispatch = useDispatch();
  const { id } = useParams();
  const genres = useSelector((state) => state.genres);
  const featuredMovies = useSelector((state) => state.featured?.movies);
  const featuredTVShows = useSelector((state) => state.featured?.tvShows);

  useEffect(() => {
   /* dispatch(fetchGenres(id)); */
  /*  dispatch(fetchFeaturedMovies()); */
   /* dispatch(fetchFeaturedTVShows()); */
  }, [dispatch, id]);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <ul>
        {genres?.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <h4>Featured Movies Today</h4>
      <ul>
        {featuredMovies &&
          featuredMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
      </ul>
      <h4>Featured TV Shows Today</h4>
      <ul>
        {featuredTVShows &&
          featuredTVShows.map((show) => <li key={show.id}>{show.title}</li>)}
      </ul>
      <div>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">TV Shows</Link>
      </div>
    </div>
  );
};

export default Home;
