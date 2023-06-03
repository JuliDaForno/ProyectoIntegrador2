import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtOKuFru1K4y-V67K2rk_X4LdctPI5aWE",
    authDomain: "proyectointegrador-cf011.firebaseapp.com",
    projectId: "proyectointegrador-cf011",
    storageBucket: "proyectointegrador-cf011.appspot.com",
    messagingSenderId: "858195969626",
    appId: "1:858195969626:web:2124b56e6e14635a747a63",
    measurementId: "G-6NPG0332PZ"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()