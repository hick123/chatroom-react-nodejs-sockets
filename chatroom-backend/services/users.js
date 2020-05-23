const users = [];

const userJoin = (id, username, chatroom) => {
  const user = { id, username, chatroom };
  users.push(user);
  console.log(users);
  return user
};

const getCurrentUser = (id) =>{
  return users.find(user => user.id === id);
}

const getChatroomUsers = (chatroom) =>{
  return users.filter(user => user.chatroom === chatroom);
}
/**
 * 
 * @param {*} id 
 * removes current users
 */
const removeUser = (id)=>{
  let f;
  const found = users.some(function(item, index) { f = index; return item.id == id; })
  if(found){
    users.splice(f,1)
  }
  console.log(f)
  users.splice(f, 1);

}

module.exports = {
  userJoin,
  getCurrentUser,
  getChatroomUsers,
  removeUser
};
