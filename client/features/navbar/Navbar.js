import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { movieQuery } from "./NavbarSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (event) => {
    console.log(event.target.value)  //delete this line when done troubleshooting
    dispatch(movieQuery(event.target.value));  //edit this line
    setSearchInput(event.target.value);
  };
  useEffect(() => {
  }, [searchInput]);
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  ///////////////////////////////////////////////delete this line when done troubleshooting
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("cool")
      navigate(`/searchresults`);
  };
////////////////////////////////////////////////delete this line when done troubleshooting


  return (
    <div>
      <nav className="nav">
        {isLoggedIn ? (
          <div className="container">
            <Link className="home-link" to="/">
            <div className="img">
              <img src="/vendeta.png"/>
            </div>
            </Link>
            <Link className="home-link" to="/">
              Home
            </Link>
                <Link to="/tvshows">TV Shows</Link>
                <Link to="/movies">Movies</Link>
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
            <Link className="team-link" to="/">
            <div className="img">
              <img className="logo" src="/vendeta.png"/>
            </div>
            </Link>
            <Link className="home-link" to="/">
              Home
            </Link>
                <Link className="links" to="/tvshows">TV Shows</Link>
                <Link className="links" to="/movies">Movies</Link>
            <form onSubmit={handleSearch}>
              <input
                className="search"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search.."
              />

            </form>
            <Link className="links" to="/team">Team</Link>
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
