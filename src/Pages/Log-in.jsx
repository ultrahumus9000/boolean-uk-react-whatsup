import { useContext } from "react";
import { usersContext } from "../App";
import SingleUserAccount from "../components/User";
export function LogIn() {
  const { users } = useContext(usersContext);

  return (
    <div className="main-wrapper login">
      <section className="login-section">
        <h2>Choose your user!</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <SingleUserAccount user={user} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
