 import firebase from 'firebase/app'
 import 'firebase/auth'
 import 'firebase/database'
 import 'firebase/storage'

 
 
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDXO_KEL6i-05WnqAqpXlZ301-Hl26TbQA",
    authDomain: "slack-1d4e5.firebaseapp.com",
    databaseURL: "https://slack-1d4e5.firebaseio.com",
    projectId: "slack-1d4e5",
    storageBucket: "slack-1d4e5.appspot.com",
    messagingSenderId: "479166501385",
    appId: "1:479166501385:web:fed5f3d6e4afadbd769ed8",
    measurementId: "G-FVX9SYSGHL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;