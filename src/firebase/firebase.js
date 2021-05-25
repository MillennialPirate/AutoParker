import firebase from "firebase";
import "firebase/auth";

var app = firebase.initializeApp({
    apiKey: "AIzaSyATS-3iGCAuzIDeXA6N86RJQyEbfTJBbiQ",
    authDomain: "autoparker-b37c3.firebaseapp.com",
    projectId: "autoparker-b37c3",
    storageBucket: "autoparker-b37c3.appspot.com",
    messagingSenderId: "710784580349",
    appId: "1:710784580349:web:cc14a9d1f951335ef9dc94",
    measurementId: "G-GQDRF57Z62"
});

export const auth = app.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export default app;
export const db = app.firestore(); 