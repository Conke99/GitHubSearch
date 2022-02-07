import axios from "axios";
import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // store User's Api in State
  const [item, setItems] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userLatesProj, setUserLatesProj] = useState([]);

  const UserProfile = async (name) => {
    // get User's profile info
    const user = await axios
      .get(`https://api.github.com/users/${name}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
    // get User's all projects
    const userProjects = await axios
      .get(`https://api.github.com/users/${name}/repos`)
      .then((res) => setUserProjects(res.data))
      .catch((err) => console.log(err));
    // get User's latest Projects
    const latestProjects = await axios
      .get(
        `https://api.github.com/users/${name}/repos?sort=created&direction=desc`
      )
      .then((res) => setUserLatesProj(res.data))
      .catch((err) => console.log(err));
    return;
  };
  // pass the State in valid components/page
  const value = {
    UserProfile,
    item,
    userProjects,
    userLatesProj,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
