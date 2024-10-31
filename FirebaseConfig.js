import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const FirebaseConfig = {
  apiKey: "AIzaSyBD91H_-W6LCqH-rNy82Ca5hgvcoI44YRM",
  authDomain: "comunidadessalvas-9acfc.firebaseapp.com",
  projectId: "comunidadessalvas-9acfc",
  storageBucket: "comunidadessalvas-9acfc.appspot.com",
  messagingSenderId: "148407171747",
  appId: "1:148407171747:web:b57b12ea3d3000a3e65d16"
};

// Inicializa o Firebase
const app = initializeApp(FirebaseConfig);

// Inicializa Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
