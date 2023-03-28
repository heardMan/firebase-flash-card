import { DB, AUTH } from '../firebase.js';
import { set, ref, onValue, get, child, update, push, remove } from 'firebase/database';

const Message = {

  create: async (convoID, userID, msg) => {
    const id = push(child(ref(DB), '/messages/')).key
    const dateTime = Date.now()
    const newMsg = {
      id:id,
      convoID: convoID,
      userID: userID,
      msg: msg,
      dateTime: dateTime
    }
    try {
      set(ref(DB, '/messages/' + id), newMsg)
      return newMsg
    }
    catch (e) {
      console.log(e.message);
    }
  },

  getByID: async (id) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/messages/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    catch (e) {
      console.log(e.message);
    }
  },

  getAllByConversationID: async (convoID) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/messages/`)).then((snapshot) => {
        if (snapshot.exists()) {
         
          const arr=[];
          Object.keys(snapshot.val()).map((key)=>{
            
            if(snapshot.val()[key]['convoID']===convoID){
              console.log('eureka');
              arr.push(snapshot.val()[key])
            }
          })

          console.log(arr);
          return arr;
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    catch (e) {
      console.log(e.message);
    }
  },

//   update: async (id, data) => {
//     try {
//       console.log(id);
//       console.log(data);
//       const updates = {}
//       updates['/messages/'+id+'/convoID'] = data['convoID']
//       updates['/messages/'+id+'/userID'] = data['userID']
//       updates['/messages/'+id+'/msg'] = data['msg']
//       updates['/messages/'+id+'/dateTime'] = data['dateTime']
//       return update(ref(DB), updates)
//     }
//     catch (e) {
//       console.log(e.message);
//     }
//   },


//   delete: async (id) => {
    
//     try {
//       return remove(ref(DB, '/messages/'+id))
//     }
//     catch (e) {
//       console.log(e.message);
//     }

//    }
  
};

export default Message;