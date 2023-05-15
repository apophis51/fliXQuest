import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { movieQuery } from "./NavbarSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // o: why not redux here?
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (event) => {
    // o: if its on main, wouldn't you say you are done troubleshooting?
    console.log(event.target.value)  //delete this line when done troubleshooting
    dispatch(movieQuery(event.target.value));  //edit this line
    setSearchInput(event.target.value);
  };
  // o: this useEffect is not doing anything
  useEffect(() => {
  }, [searchInput]);
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  ///////////////////////////////////////////////delete this line when done troubleshooting
  const handleSearch = (event) => {
    event.preventDefault();
      navigate(`/searchresults`);
  };
////////////////////////////////////////////////delete this line when done troubleshooting


  return (
    <div>
      <nav className="nav">
        {isLoggedIn ? (
          <div className="container">
            <div className="img">
              <img
                className="logo"
                src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png"
              />
            </div>
            <Link className="home-link" to="/">
              Home
            </Link>
            <div className="dropdown">
              <button className="dropbtn">Dropdown</button>
              <div className="dropdown-content">
                <Link to="/tvshows">TV Shows</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/CastCrew">Cast/Crew</Link>
              </div>
            </div>
            <form onSubmit={handleSearch}>
              <input
              className="search"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search.."
              />
              <button type="submit">
                Search
              </button>
            </form>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div className="container">
            <div className="img">
              <img
                className="logo"
                src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png"
              />
            </div>
            <Link className="home-link" to="/">
              Home
            </Link>
            <div className="dropdown">
              <button className="dropbtn">Menu</button>
              <div className="dropdown-content">
                <Link to="/tvshows">TV Shows</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/CastCrew">Cast/Crew</Link>
              </div>
            </div>
            <form onSubmit={handleSearch}>
              <input
                className="search"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search.."
              />

            </form>
            <Link className="links" to="/login">
              Login
            </Link>
            <Link className="links" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};
export default Navbar;
