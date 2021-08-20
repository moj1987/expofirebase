import firebase from 'firebase'
import '@firebase/auth';
import '@firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBjNaMNp4WhU4Sknc11wHekcndhNF6wtrQ",

  authDomain: "project-5479518509391935408.firebaseapp.com",

  databaseURL:
    "https://project-5479518509391935408-default-rtdb.firebaseio.com",

  projectId: "project-5479518509391935408",

  storageBucket: "project-5479518509391935408.appspot.com",

  messagingSenderId: "373335282610",

  appId: "1:373335282610:web:312b0407bd2cbde7a94aab",

  measurementId: "G-L423NJML1C",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} 
export { firebase };