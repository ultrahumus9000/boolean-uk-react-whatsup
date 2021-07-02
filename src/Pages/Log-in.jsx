import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { useContext } from "react";
import { usersContext } from "../App";
import SingleUserAccount from "../components/User";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export function LogIn() {
  const { users } = useContext(usersContext);
  const classes = useStyles();

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
          <Link to="/registration">
            <li className="add">
              <Tooltip title="Add" aria-label="add">
                <Fab color="primary" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <h3>Add New User</h3>
            </li>
          </Link>
        </ul>
      </section>
    </div>
  );
}
