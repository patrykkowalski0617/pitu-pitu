import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCj06-EMatK4gQuFKMG3uqp2zf2lEnPee8",
    authDomain: "messenger-8888.firebaseapp.com",
    databaseURL: "https://messenger-8888.firebaseio.com",
    projectId: "messenger-8888",
    storageBucket: "messenger-8888.appspot.com",
    messagingSenderId: "80661659585",
    appId: "1:80661659585:web:210f5c4c5c20ffe1f1f940"
});

const db = firebaseApp.firestore();

export default db;
