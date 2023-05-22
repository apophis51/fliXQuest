import React from "react";
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div className="big-boy-container">
      <div>
      <h1 className="team">Meet the Team</h1>
      </div>
    <div className="total-container">

      <div className="team-card1">
      <img className="id-pic" src="/63278334798__6EE22F29-0886-47FC-A4BE-03A4C40188DB.jpg"/>
      <div className="name-box">
      <h3 className="name">Samuel Michaels</h3>
      </div>
      <p className="job-title">Developer</p>
      <Link className="linkedin-link" to="https://www.linkedin.com/in/samichaels/">
      <img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/LinkedIn-Symbole.png" className="linkedin"/>
      </Link>
      </div>

      <div className="team-card2">
      <img className="id-pic" src="/headshot_beard_720.jpg"/>
      <div className="name-box">
      <h3 className="name">Rhyan St. Clair</h3>
      </div>
      <p className="job-title">Developer</p>
      <Link className="linkedin-link" to="https://www.linkedin.com/in/rhyanstclair/">
      <img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/LinkedIn-Symbole.png" className="linkedin"/>
      </Link>
      </div>

      <div className="team-card3">
      <img className="id-pic" src="/img_3952_720.jpg"/>
      <div className="name-box">
      <h3 className="name">Burnett Codling</h3>
      </div>
      <p className="job-title">Developer</p>
      <Link className="linkedin-link" to="https://www.linkedin.com/in/burnett-codling-ba15a4143/?trk=contact-info">
      <img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/LinkedIn-Symbole.png" className="linkedin"/>
      </Link>
      </div>

      <div className="team-card4">
      <img className="id-pic" src="/img_20221005_172836978_magic_magic_480.jpg"/>
      <div className="name-box">
      <h3 className="name">Malcolm Vernon</h3>
      </div>
      <p className="job-title">Developer</p>
      <Link className="linkedin-link" to="https://www.linkedin.com/in/malcolm-vernon/">
      <img src="https://blog.waalaxy.com/wp-content/uploads/2021/01/LinkedIn-Symbole.png" className="linkedin"/>
      </Link>
      </div>
      </div>
      </div>
  );
};

export default Team;
