// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEMA0DrxR2pZKz2hFn8L9_Y4U6m2iD6U8",
  authDomain: "sparta-react-basic-2cd86.firebaseapp.com",
  projectId: "sparta-react-basic-2cd86",
  storageBucket: "sparta-react-basic-2cd86.appspot.com",
  messagingSenderId: "131385999095",
  appId: "1:131385999095:web:7906c62e2b3c9dd44e1df2",
  measurementId: "G-0P4L3PS440"
};
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();