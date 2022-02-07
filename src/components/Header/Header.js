import React, { useContext, useState } from "react";
import { UserContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { UserProfile } = useContext(UserContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserProfile(name);
      history("/user");
    } catch {
      setError("Can't find the user");
    }
  };
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__left">
          <img src="/images/GitHub.png" alt="Logo" />
          <h1>Searcher</h1>
        </div>
        {error && (
          <div className="error">
            <span>{error}</span>
          </div>
        )}
        <div className="header__right">
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Enter UserName"
            />
            <img
              onClick={handleSubmit}
              src="/images/search-solid.svg"
              alt="loop"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
