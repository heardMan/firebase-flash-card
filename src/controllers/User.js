import { DB, AUTH } from '../firebase.js';
import { set, ref, onValue, get, child, update } from 'firebase/database';

const User = {

  createUserProfile: async (uid, email, firstName, lastName) => {
    try {
      set(ref(DB, '/users/' + uid), {
        email: email,
        firstName: firstName,
        lastName: lastName
      })
    }
    catch (e) {
      console.log(e.message);
    }
  },

  getUserProfile: async (id) => {
    try {
      const dbRef = ref(DB);
      return await get(child(dbRef, `users/${id}`)).then((snapshot) => {
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

  updateUserProfile: async (id, data) => {
    try {
      console.log(id);
      console.log(data);
      const updates = {}
      updates['/users/'+id+'/firstName'] = data['firstName']
      updates['/users/'+id+'/lastName'] = data['lastName']
      updates['/users/'+id+'/email'] = data['email']
      return update(ref(DB), updates)
    }
    catch (e) {
      console.log(e.message);
    }
  }
  
};

export default User;