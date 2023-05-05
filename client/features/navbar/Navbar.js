import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <nav className="nav" >
        {isLoggedIn ? (
          <div className="container">
            <div className="img">
            {/* The navbar will show these links after you log in */}
            <img
              className="logo"
              src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png"
            />
            </div>
            <div className="dropdown">
              <button className="dropbtn">Dropdown</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
            <input className="search" type="text" placeholder="Search.." />
            <button className="links" type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>

        ) : (
          <div className="container">
            <div className="img">
            {/* The navbar will show these links before you log in */}
            <img
              className="logo"
              src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png"
            />
            </div>
            <div className="dropdown">
              <button className="dropbtn">Menu</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
            <input className="search" type="text" placeholder="Search.." />
            <Link className="links" to="/login">Login</Link>
            <Link className="links" to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>

  );
};
export default Navbar;
