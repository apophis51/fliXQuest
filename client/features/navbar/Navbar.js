import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    }, [searchInput]);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

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
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search.."
            />
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
            <input
              className="search"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search.."
            />
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
