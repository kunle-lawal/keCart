import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyASWTMi_6kji7VIBM9IprAnify9bjvOAJ8",
  authDomain: "chat-app-91d9f.firebaseapp.com",
  databaseURL: "https://chat-app-91d9f.firebaseio.com",
  projectId: "chat-app-91d9f",
  storageBucket: "chat-app-91d9f.appspot.com",
  messagingSenderId: "138911963761",
  appId: "1:138911963761:web:8c1a4a0727482e954c99d0",
  measurementId: "G-JYXT7SRN57"
};

firebase.initializeApp(config);
// firebase.firestore().settings({timestampsInSnapshots: true});
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);

export default firebase;