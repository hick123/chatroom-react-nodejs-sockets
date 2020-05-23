import React from "react";
const ChatroomUsers = (props) => {

    const { users } = props;
  
  return (
    <div className="chatroom-users">
        {/* { JSON.stringify(users)} */}
      <p style={{textAlign:"center"}}> Online Users ({users.length}) </p> 
      <ul>
          {
            users.map((currentValue, index, arr)=>{
                return <li style={{ listStyle:"none"}}>
                    {currentValue.username}
                </li>
            })
          }
      </ul>
    </div>
  );
};
export default ChatroomUsers;
