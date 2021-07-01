import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { usersContext } from "../App";
import { SideChatList } from "../components/SideChat";
export default function ChatDetails() {
  let history = useHistory();

  const { users, activeUser, conversations, setConversations } =
    useContext(usersContext);

  if (activeUser.avatar === undefined) {
    history.push("/");
  }
  let filteredUsers = users.filter(
    (user) => user.firstName !== activeUser.firstName
  );

  const { chatId } = useParams();
  console.log(typeof chatId);
  console.log(chatId);
  console.log(conversations);

  //chat id is who the active user chat with need to find coversation id  first
  useEffect(() => {
    fetch(`http://localhost:4000/conversations?userId=${activeUser.id}`)
      .then((resp) => resp.json())
      .then((conversationInfo) => {
        let findCov = conversationInfo.find((cov) => {
          let condition =
            (cov.participantId === parseInt(chatId) &&
              cov.userId === activeUser.id) ||
            (cov.participantId === activeUser.id &&
              cov.userId === parseInt(chatId));
          return condition;
        });
        return findCov;
      })
      .then((findCov) => {
        fetch(`http://localhost:4000/messages?conversationId=${findCov.id}`)
          .then((resp) => resp.json())
          .then(setConversations);
      });
  }, []);

  return (
    <div className="main-wrapper">
      <aside>
        {/* <!-- Side Header --> */}
        <header className="panel">
          <img
            className="avatar"
            width="50"
            height="50"
            src={activeUser.avatar}
            alt=""
          />
          <h3>{`${activeUser.firstName} ${activeUser.lastName}`}</h3>
        </header>

        <form className="aside__search-container">
          <input
            type="search"
            name="messagesSearch"
            placeholder="Search chats"
            value=""
          />
        </form>
        <SideChatList filteredUsers={filteredUsers} />
      </aside>
      {/*   
  <!-- Main Chat Section --> */}
      <main className="conversation">
        {/* <!-- Chat header --> */}
        <header className="panel"></header>

        <ul class="conversation__messages">
          {conversations.length === 0 ? (
            <h2>Loading</h2>
          ) : (
            conversations.map((message, index) => (
              <li
                key={index}
                className={message.userId === activeUser.id ? "outgoing" : null}
              >
                <p>{message.messageText}</p>
              </li>
            ))
          )}
        </ul>

        {/* <!-- Message Box --> */}
        <footer>
          <form className="panel conversation__message-box">
            <input type="text" placeholder="Type a message" rows="1" value="" />
            <button type="submit">
              {/* <!-- This is the send button --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                ></path>
              </svg>
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}
