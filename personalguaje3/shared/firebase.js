import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage } from "firebase/storage"


const firebaseConfig =  initializeApp({
    apiKey: "AIzaSyDbacF_9l3pHEoXHsBs_u3Tmv1pROUDryw",
    authDomain: "sparta-homework3.firebaseapp.com",
    projectId: "sparta-homework3",
    storageBucket: "sparta-homework3.appspot.com",
    messagingSenderId: "640845019214",
    appId: "1:640845019214:web:364b56aa8a9200f1d26b1f",
    measurementId: "G-WD2TT8TB0K"
})

const firestore= getFirestore()
const apiKey = "AIzaSyDbacF_9l3pHEoXHsBs_u3Tmv1pROUDryw";
const auth = getAuth();
const storage =getStorage() 


export { auth,apiKey,firestore,storage };


