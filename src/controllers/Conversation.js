import { DB, AUTH } from '../firebase.js';
import { set, ref, onValue, get, child, update, push, remove } from 'firebase/database';

const Conversation = {

  create: async (uid) => {
    const id = push(child(ref(DB), '/conversations/')).key
    try {
      set(ref(DB, '/conversations/' + id), {
        id:id,
        uid: uid
      })
      return id
    }
    catch (e) {
      console.log(e.message);
    }
  },

  getByID: async (id) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/conversations/${id}`)).then((snapshot) => {
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

  getAllByUID: async (uid) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/conversations/`)).then((snapshot) => {
        if (snapshot.exists()) {
         
          const arr=[];
          Object.keys(snapshot.val()).map((key)=>{
            
            if(snapshot.val()[key]['uid']===uid){
              //console.log('eureka');
              //console.log(snapshot.val());
              let conversation = snapshot.val()[key]
              //console.log(key);
              conversation['id'] = key;
              arr.push(conversation)
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

  update: async (id, data) => {
    try {
      console.log(id);
      console.log(data);
      const updates = {}
      updates['/conversations/'+id+'/uid'] = data['uid']
      updates['/conversations/'+id+'/convoID'] = data['convoID']
      return update(ref(DB), updates)
    }
    catch (e) {
      console.log(e.message);
    }
  },

  delete: async (id) => {
    
    try {
      return remove(ref(DB, '/conversations/'+id))
    }
    catch (e) {
      console.log(e.message);
    }

   }

};

export default Conversation;