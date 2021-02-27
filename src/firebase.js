import firebase from "firebase"
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAvP7imH8L2vbKukPaH3QBb22xHBfnkdSM",
    authDomain: "login-e872f.firebaseapp.com",
    projectId: "login-e872f",
    storageBucket: "login-e872f.appspot.com",
    messagingSenderId: "1043841747084",
    appId: "1:1043841747084:web:2fc3030a4c55d1d61293a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase

  // export auth  
  export const auth = firebase.auth()
  // export storage
  export const storage = firebase.storage();
  // export db
  export const db = firebase.database();