import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <img className="logo" src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png" />
            <div class="dropdown">
              <button class="dropbtn">Dropdown</button>
              <div class="dropdown-content">
                <a href="#">Movies</a>
                <a href="#">TV Shows</a>
                <a href="#">Awards & Events</a>
              </div>
            </div>
            <input type="text" placeholder="Search.."></input>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div id="nav-container">
            {/* The navbar will show these links before you log in */}
            <img className="logo" src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png" />
            <div class="dropdown">
              <button class="dropbtn">Dropdown</button>
              <div class="dropdown-content">
              <a href="#">Movies</a>
                <a href="#">TV Shows</a>
                <a href="#">Awards & Events</a>
              </div>
            </div>
            <input className="search" type="text" placeholder="Search.."></input>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};
export default Navbar;
