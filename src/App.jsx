import React, { useContext, useEffect, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LogIn } from "./Pages/Log-in";
import { LoggedIn } from "./Pages/LoggedIn";
import ChatDetails from "./Pages/ChatDetails";

export const usersContext = React.createContext({});

export default function App() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [conversations, setConversations] = useState([]);

  console.log(activeUser.firstName);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((resp) => resp.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <Route path="/" exact>
        <usersContext.Provider value={{ users, setActiveUser }}>
          <LogIn />
        </usersContext.Provider>
      </Route>
      <Route path="/login" exact>
        <usersContext.Provider value={{ users, setActiveUser }}>
          <LogIn />
        </usersContext.Provider>
      </Route>
      <Route path="/logged-in" exact>
        {activeUser.firstName !== undefined ? (
          <usersContext.Provider value={{ users, activeUser }}>
            <LoggedIn />
          </usersContext.Provider>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/logged-in/:chatId" exact>
        <usersContext.Provider
          value={{ users, activeUser, conversations, setConversations }}
        >
          <ChatDetails />
        </usersContext.Provider>
      </Route>
    </div>
  );
}
