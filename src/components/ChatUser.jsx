import { Link } from "react-router-dom";

export default function ChatUser({ user }) {
  return (
    <Link to={`/logged-in/${user.id}`}>
      <button className="chat-button">
        <img
          className="avatar"
          height="50"
          width="50"
          alt=""
          src={user.avatar}
        />
        <div>
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <p>Last message</p>
        </div>
      </button>
    </Link>
  );
}
