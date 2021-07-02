import { useCallback } from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { usersContext } from "../App";
import { SideChatList } from "../components/SideChat";

export default function ChatDetails() {
  const [temporaryChat, settemporaryChat] = useState("");
  let history = useHistory();
  const { users, activeUser, conversations, setConversations } =
    useContext(usersContext);

  let filteredUsers = users.filter(
    (user) => user.firstName !== activeUser.firstName
  );
  if (activeUser.avatar === undefined) {
    history.push("/");
  }
  console.log(activeUser);
  const { chatId } = useParams();

  //chat id is who the active user chat with need to find coversation id  first

  const findCoversationId = useCallback(
    function () {
      let activeUserId = activeUser.id;
      return fetch(`http://localhost:4000/conversations?userId=${activeUserId}`)
        .then((resp) => resp.json())
        .then((conversationInfo) => {
          console.log(conversationInfo);
          let findCov = conversationInfo.find((cov) => {
            let condition =
              (cov.participantId === parseInt(chatId) &&
                cov.userId === activeUser.id) ||
              (cov.participantId === activeUser.id &&
                cov.userId === parseInt(chatId));
            return condition;
          });
          console.log(findCov);
          if (findCov === undefined) {
            let newConv = {
              userId: activeUserId,
              participantId: parseInt(chatId),
            };
            return fetch(`http://localhost:4000/conversations`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newConv),
            })
              .then((newCov) => newCov.json())
              .then((newCov) => {
                return newCov;
              });
          }
          return findCov;
        });
    },
    [activeUser.id, chatId]
  );

  useEffect(() => {
    if (activeUser.avatar === undefined) {
      return;
    }
    findCoversationId().then((findCov) => {
      console.log(findCov);
      if (findCov === undefined) {
        return;
      }
      fetch(`http://localhost:4000/messages?conversationId=${findCov.id}`)
        .then((resp) => resp.json())
        .then(setConversations);
    });
  }, [
    activeUser.id,
    chatId,
    setConversations,
    activeUser.avatar,
    temporaryChat,
    findCoversationId,
  ]);

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
          {conversations.length === 0
            ? null
            : conversations.map((message, index) => (
                <li
                  key={index}
                  className={
                    message.userId === activeUser.id ? "outgoing" : null
                  }
                >
                  <p>{message.messageText}</p>
                </li>
              ))}
        </ul>

        {/* <!-- Message Box --> */}
        <footer>
          <form
            className="panel conversation__message-box"
            onSubmit={(e) => {
              e.preventDefault();
              //find which conversation id is, // find the active user is
              findCoversationId().then((conversationObj) => {
                let conversationId = conversationObj.id;
                console.log(conversationId);
                fetch("http://localhost:4000/messages", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    messageText: e.target.sending.value,
                    userId: activeUser.id,
                    conversationId: conversationId,
                  }),
                }).then(() => {
                  settemporaryChat("");
                });
              });
            }}
          >
            <input
              type="text"
              name="sending"
              placeholder="Type a message"
              rows="1"
              value={temporaryChat}
              onChange={(e) => {
                settemporaryChat(e.target.value);
              }}
            />
            <button type="submit">
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
