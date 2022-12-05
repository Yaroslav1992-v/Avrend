import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const GoBack = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="navigation__return">
      <BiArrowBack />
    </button>
  );
};

export default GoBack;
