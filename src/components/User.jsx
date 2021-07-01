import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { usersContext } from "../App";
export default function SingleUserAccount({ user }) {
  const { setActiveUser } = useContext(usersContext);
  let history = useHistory();

  function addActiveUser() {
    setActiveUser(user);
    history.push("/logged-in");
    console.log("lol");
  }

  return (
    <button className="user-selection" onClick={addActiveUser}>
      <img className="avatar" width="50" height="50" src={user.avatar} alt="" />
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
    </button>
  );
}
