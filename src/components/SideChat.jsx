import ChatUser from "./ChatUser";
export function SideChatList({ filteredUsers }) {
  return (
    <ul>
      {/* <!-- This first item should always be present --> */}
      <li>
        <button className="chat-button">
          <div>
            <h3>+ Start a new Chat</h3>
          </div>
        </button>
      </li>
      {filteredUsers.map((user, index) => (
        <li key={index}>
          <ChatUser user={user} />
        </li>
      ))}
    </ul>
  );
}
