import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import AllMovies from "../features/Movies/AllMovies";
import AllTVshows from "../features/TVSHOWS/AllTVshows";
import SingleMovie from "../features/Movies/SingleMovie/SingleMovie";
import SingleTVshow from "../features/TVSHOWS/SingleTVshows/SingleTVshow";
import SearchResults from "../features/SearchResults/SearchResults";
import { me } from "./store";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/searchresults" element={<SearchResults />} />
        {isLoggedIn ? (
          <>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/movies" element={<AllMovies />} />
            <Route exact path="/movies/:id" element={<SingleMovie />} />
            <Route exact path="/tvshows" element={<AllTVshows />} />
            <Route exact path="/tvshows/:id" element={<SingleTVshow />} />
          </>
        ) : (
          <>
            <Route
              exact
              path="/"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              exact
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              exact
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/movies" element={<AllMovies />} />
            <Route exact path="/movies/:id" element={<SingleMovie />} />
            <Route exact path="/tvshows" element={<AllTVshows />} />
            <Route exact path="/tvshows/:id" element={<SingleTVshow />} />
            <Route exact path="/searchresults" element={<SearchResults />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
