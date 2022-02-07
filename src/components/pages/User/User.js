import React, { useContext } from "react";
import { UserContext } from "../../context/Context";

const User = () => {
  // take the state from Context and map the data to render it on the screen
  const { item } = useContext(UserContext);
  const { userProjects } = useContext(UserContext);
  const { userLatesProj } = useContext(UserContext);

  return (
    <div className="user">
      <div className="user__content">
        <div className="leftSide__user">
          <img src={item.avatar_url} alt="Avatar" />
          <h2>{item.name}</h2>
          <h3>{item.login}</h3>
          <div className="about_user">
            <div className="location_company">
              <img src="/images/map-marker-alt-solid.svg" alt="location" />
              <h3>{item.location}</h3>
            </div>
            <div className="location_company">
              <img src="/images/building-solid.svg" alt="Company" />
              <h3>Work: {item.company}</h3>
            </div>
          </div>
          <div className="followers">
            <div className="user__folow">
              <h4>Followers:</h4>
              <p>{item.followers}</p>
            </div>
            <div className="user__folow">
              <h4>Following:</h4>
              <p>{item.following}</p>
            </div>
          </div>
        </div>
        <div className="rightSide__user">
          <div className="overview__user">
            <img src="/images/book-solid.svg" alt="Book" />
            <h5>Overview: {item.public_repos}</h5>
          </div>
          <div className="user__line"></div>
          <div className="user__projects">
            {userProjects.map((project) => (
              <div className="user__project" key={project.id}>
                <p className="user__project__name">{project.name}</p>
                <p>{project.description}</p>
                <div className="user__language">
                  <div className="circle"></div>
                  <p>{project.language}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="user__bottom">
        <div className="user__bottom__content">
          <div className="user__Repositories">
            <img src="/images/book-open-solid.svg" alt="book open" />
            <h5>Latest Repositories</h5>
          </div>
          <div className="user__latest__repo">
            {userLatesProj
              .filter((item, i) => i < 5)
              .map((repo) => (
                <div className="user__repo" key={repo.id}>
                  <h5>{repo.name}</h5>
                  <div className="user__about__repo">
                    <p className="user__date">{repo.updated_at}</p>
                    <p className="user__watchers">Watchers: {repo.watchers}</p>
                    <p className="user__watchers__count">
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

export default User;
