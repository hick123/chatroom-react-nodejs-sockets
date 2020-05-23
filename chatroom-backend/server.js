const express = require("express");
const http = require("http");
const moment = require('moment');
const socketIo = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  getChatroomUsers,
  removeUser
} = require("./services/users");
const { formatMessage } = require("./services/message");

const app = express();
const port = 4000;

const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => res.send("Hello World!"));

const chatbot = "Chatbot";

io.on("connection", (socket) => {
  console.log("New client connected");

  /**
   * when user joins chatroom
   */
  socket.on("user-joining", async (data) => {
    const { username, chatroom } = data;
    const user = await userJoin(socket.id, username, chatroom);

    socket.join(user.chatroom);

    //emits to the user
    socket.emit(
      "message",
      formatMessage(chatbot, `Welcome to ${user.chatroom}`)
    );
    //broadcast to all the chatroom users
    socket.broadcast
      .to(user.chatroom)
      .emit(
        "message",
        formatMessage(chatbot, `${user.username} has joined the chatroom`)
      );

    //returns current chatroom users
    io.to(user.chatroom).emit("room-users", getChatroomUsers(user.chatroom));
  });
  /**
   * when user sends message to chatroom chatroom
   */
  socket.on("send-message", (text) => {
    const user = getCurrentUser(socket.id);
    console.log(user);
    console.log(text);
    //broadcast to all the chatroom users
    socket.broadcast
      .to(user.chatroom)
      .emit("message", formatMessage(user.username, text));
  });

   // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    const user = getCurrentUser(socket.id);
    if (!user) return
    removeUser(socket.id)   
    console.log("user left",user)
      // echo globally that this client has left
      socket.broadcast.to(user.chatroom).emit('user left', {
        text:  `${user.username} has left`,
        users:getChatroomUsers(user.chatroom),
        time: moment().format('h:mm a')
      });
  });
});
server.listen(port, () =>
  console.log(`server listening at http://localhost:${port}`)
);
