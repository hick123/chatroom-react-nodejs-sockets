import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./login.css";

const Login = () => {
  let history = useHistory();
  const location = useLocation();

  const [formvalues, setFormValues] = useState({
    username: "",
    chatroom: "",
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValues({
      ...formvalues,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!formvalues.chatroom || !formvalues.username) {
      setShowError(true);
      return
    }

    console.log(formvalues);
    history.push({
      pathname: "/chatroom",
      data: { formvalues },
    });
  };

  return (
    <div className="wrapper">
      <div className="form-div">
        {/* <div class="alert alert-info" role="alert">
          Enter username and chatroom
        </div> */}
          {showError ? (
            <div class="alert alert-danger" role="alert">
           username or chatroom is missing
            </div>
          ) : (
            ""
          )}
        <form onSubmit={handlesubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChange}
              value={formvalues.username}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Select Chatroom</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              name="chatroom"
              value={formvalues.chatroom}
              onChange={handleChange}
            >
              <option defaultValue>choose chatroom</option>
              <option value="python">python</option>
              <option value="javascript">javascript</option>
            </select>
          </div>
          <button
            type="submit"
            value="sub"
            class="btn btn-primary"
            style={{ backgroundColor: "#8440c9" }}
          >
            Submit
          </button>
          {/* {showError ? (
            <div class="alert alert-danger" role="alert">
              A simple danger alert—check it out!
            </div>
          ) : (
            ""
          )} */}
        </form>
      </div>
    </div>
  );
};
export default Login;
