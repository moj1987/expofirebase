import firebase from 'firebase'
import '@firebase/auth';
import '@firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAfGYryRXI52Qs4jNCfYo69LS2L33tzFL4",

    authDomain: "prog8110summer2021.firebaseapp.com",

    databaseURL: "https://prog8110summer2021-default-rtdb.firebaseio.com",

    projectId: "prog8110summer2021",

    storageBucket: "prog8110summer2021.appspot.com",

    messagingSenderId: "871503641834",

    appId: "1:871503641834:web:a1f58dd2e03dbdefec6b93"

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };