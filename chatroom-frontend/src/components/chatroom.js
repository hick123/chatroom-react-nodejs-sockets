import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./chatroom.css";
import io from "socket.io-client";
import moment from 'moment';
import ChatroomUsers from "./chatroomUsers";

//scroll to the end of the chat
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "glamor";
const ROOT_CSS = css({
  height: "90vh",
  width: "100%",
});

const socket = io("http://localhost:4000");

const ChatRoom = () => {

  const location = useLocation();
  let history = useHistory();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);

  //gets form data forwarded from login through useLocation from  react-router-dom
  const formdata = () => {
    if (location.data) {
      socket.emit("user-joining", location.data.formvalues);
    } else {
      history.push({
        pathname: "/",
        warning: "Please login again",
      });
    }
  };

  useEffect(() => {
    formdata();
    //listens to messages from backend
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
      console.log(messages);
    });

    socket.on("room-users", (data) => {
      console.log(data);
      setUsers(data);
    });
    //notifies chatrooms users has left and updates number of users
    socket.on("user left",(data) => {
      console.log(data)
      setMessages((messages) => [...messages, data]);
      //updates online users list
      setUsers(data.users);
      console.log("user has left",messages);
    })
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    // console.log(value)
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-message", text);
    const messageObj = {
      username: "me",
      text: text,
      time: moment().format('h:mm a')
    };
    setMessages((messages) => [...messages, messageObj]);
  };


  return (
    <div>
      <div className="sidebar">
        <img
          className="logo"
          src={require("../assets/chat-box.svg")}
          width="60rem"
          height="60rem"
        />
        <h2 className="title">
          {location.data ? `${location.data.formvalues.chatroom} chatroom` : ""}
        </h2>
        {/*
         *  Get current users in chatroom
         */}
        <div className="chatroom-users">
          <ChatroomUsers users={users} />
        </div>

        {/*
         * Logout button
         */}

        <div  className="logout">
        <i className="fa fa-sign-out" onClick={()=> history.push("/")}></i>
        
        </div>
      </div>
      <div className="main">
        <div className="chat">
          <div class="panel-body">
            <ScrollToBottom className={ROOT_CSS}>
              <ul class="chat">
                {/*
                 *  list text messages in the chatroom currently
                 */}
                {messages.map((currentValue, index, arr) => {
                  return (
                    <li class="left clearfix">
                      <span class="chat-img pull-left">
                        <img
                          src="http://placehold.it/50/55C1E7/fff&text=A"
                          alt="User Avatar"
                          class="img-circle"
                        />
                      </span>
                      <div class="chat-body clearfix">
                        <div class="header">
                          <strong class="primary-font">
                            {currentValue.username}
                          </strong>{" "}
                          <small class="pull-right text-muted">
                            <span class="glyphicon glyphicon-time"></span>
                            {currentValue.time}{" "}
                          </small>
                        </div>
                        <p>{currentValue.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollToBottom>
          </div>

          <div class="panel-footer">
            <form onSubmit={handleSubmit}>
              <div class="input-group">
                <input
                  id="btn-input"
                  type="text"
                  class="form-control input-sm"
                  placeholder="Type your message here..."
                  onChange={handleChange}
                />{" "}
                <span class="input-group-btn">
                  <button class="btn btn-warning btn-sm" id="btn-chat">
                    Send
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
