import React, { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [repo, setRepo] = useState([]);
  const [newestRepo, setNewestRepo] = useState([]);

  useEffect(() => {
    // profile info
    axios
      .get("https://api.github.com/users/FoodNipple")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        toast.error("Error fetching Profile");
      });
    //profile projects
    axios
      .get("https://api.github.com/users/FoodNipple/repos")
      .then((res) => {
        setRepo(res.data);
      })
      .catch((err) => {
        toast.error("Error fetching Projects");
      });
    //latest projects
    axios
      .get(
        "https://api.github.com/users/FoodNipple/repos?sort=created&direction=desc"
      )
      .then((res) => {
        setNewestRepo(res.data);
      })
      .catch((err) => {
        toast.error("Error fetching Projects");
      });
  }, []);

  return (
    <div className="home">
      <div className="home__contnet">
        <div className="leftSide__home">
          <img src={profile.avatar_url} alt="Profile Pic" />
          <h2>{profile.name}</h2>
          <h3>{profile.login}</h3>
          <div className="about_profile">
            <h3>{profile.location}</h3>
            <h3>{profile.company}</h3>
          </div>
          <div className="follow">
            <div className="follow__content">
              <h4>Followers:</h4>
              <p>{profile.followers}</p>
            </div>
            <div className="follow__content">
              <h4>Following:</h4>
              <p>{profile.following}</p>
            </div>
          </div>
        </div>
        <div className="rightSide__home">
          <div className="Overview">
            <img src="/images/book-solid.svg" alt="book" />
            <h5>Overview: {profile.public_repos}</h5>
          </div>

          <div className="line"></div>
          <div className="projects">
            {repo.map((project) => (
              <div className="project" key={project.id}>
                <p className="project__name">{project.name}</p>
                <p>{project.description}</p>
                <div className="language">
                  <div className="circle"></div>
                  <p>{project.language}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="home__bottom">
        <div className="home__bottom__content">
          <div className="Repositories">
            <img src="/images/book-open-solid.svg" alt="book open" />
            <h5>Latest Repositories</h5>
          </div>
          <div className="latest__repo">
            {newestRepo
              .filter((item, i) => i < 5)
              .map((repo) => (
                <div className="repo" key={repo.id}>
                  <h5>{repo.name}</h5>
                  <div className="about__repo">
                    <p className="date">{repo.updated_at}</p>
                    <p className="Watchers">Watchers: {repo.watchers}</p>
                    <p className="watchers_count">
                      Watchers Count: {repo.watchers_count}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
