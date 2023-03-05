import { DB, AUTH } from '../firebase.js';
import { set, ref, onValue, get, child, update, push, remove } from 'firebase/database';

const Card = {

  create: async (setid, front, back) => {
    const id = push(child(ref(DB), '/cards/')).key
    try {
      set(ref(DB, '/cards/' + id), {
        id:id,
        setid: setid,
        front: front,
        back: back
      })
    }
    catch (e) {
      console.log(e.message);
    }
  },

  getByID: async (id) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/cards/${id}`)).then((snapshot) => {
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

  getAllBySetID: async (setid) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `/cards/`)).then((snapshot) => {
        if (snapshot.exists()) {
         
          const arr=[];
          Object.keys(snapshot.val()).map((key)=>{
            
            if(snapshot.val()[key]['setid']===setid){
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
      //updates['/cards/'+id+'/uid'] = data['uid']
      //updates['/cards/'+id+'/setid'] = data['setid']
      updates['/cards/'+id+'/front'] = data['front']
      updates['/cards/'+id+'/back'] = data['back']
      return update(ref(DB), updates)
    }
    catch (e) {
      console.log(e.message);
    }
  },

  delete: async (id) => {
    
    try {
      return remove(ref(DB, '/cards/'+id))
    }
    catch (e) {
      console.log(e.message);
    }

   }
  
};

export default Card;