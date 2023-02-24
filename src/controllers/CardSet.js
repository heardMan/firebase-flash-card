import { DB, AUTH } from '../firebase.js';
import { set, ref, onValue, get, child, update, push } from 'firebase/database';

const CardSet = {

  create: async (uid, name, description) => {
    const id = push(child(ref(DB), '/cardsets/')).key
    try {
      set(ref(DB, '/cardsets/' + id), {
        uid: uid,
        name: name,
        description: description
      })
    }
    catch (e) {
      console.log(e.message);
    }
  },

  getByID: async (id) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/cardsets/${id}`)).then((snapshot) => {
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
      return await get(child(dbRef, `/cardsets/`)).then((snapshot) => {
        if (snapshot.exists()) {
         
          const arr=[];
          Object.keys(snapshot.val()).map((key)=>{
            
            if(snapshot.val()[key]['uid']===uid){
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

  update: async (id, data) => {
    try {
      console.log(id);
      console.log(data);
      const updates = {}
      updates['/cardsets/'+id+'/uid'] = data['uid']
      updates['/cardsets/'+id+'/setName'] = data['setName']
      updates['/cardsets/'+id+'/setDescription'] = data['setDescription']
      return update(ref(DB), updates)
    }
    catch (e) {
      console.log(e.message);
    }
  },

  delete: async (id) => { }
  
};

export default CardSet;