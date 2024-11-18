// solo los metodos que usamos que vienen desde firebaseauth, sabemos que utilizaremos getauth, signout, signin, logout,Create onauthstatechanged para saber si alguien se desconecta, se conecta, etc y cambiar las variables globales.

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import firebaseApp from "./firebaseConfig";

const auth = getAuth(firebaseApp);

 export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut}; 