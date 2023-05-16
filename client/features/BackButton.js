import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <img
      className="x"
      src="https://cdn-icons-png.flaticon.com/512/483/483366.png"
      onClick={handleBackButtonClick}
      alt="Back Button"
    />
  );
};

export default BackButton;
