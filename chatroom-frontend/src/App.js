import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import ChatRoom from "./components/chatroom";

function App() {
  return (
    <Router>
      <Switch> 
        <Route exact="true" path="/">
          <Login />
        </Route>
        <Route exact path="/chatroom">
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
