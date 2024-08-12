// src/components/database/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Seu objeto de configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRDhMIpIHsLjEN57_pIx_fQq3WJFm82G0",
    authDomain: "react-projects-cfj.firebaseapp.com",
    projectId: "react-projects-cfj",
    storageBucket: "react-projects-cfj.appspot.com",
    messagingSenderId: "710630142818",
    appId: "1:710630142818:web:3d099517cf8e4141c5723b",
    measurementId: "G-Y3NVK9V91L"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
