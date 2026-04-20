import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// 🔥 FIRESTORE
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 AUTH
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBarIe805-TVF4YUKSoCgS3QfPh-Ehz5gk",
  authDomain: "claro-b4234.firebaseapp.com",
  projectId: "claro-b4234",
  storageBucket: "claro-b4234.firebasestorage.app",
  messagingSenderId: "723168200360",
  appId: "1:723168200360:web:91345a9e017966cc50a49d",
};

const app = initializeApp(firebaseConfig);

// 🔥 EXPORTAMOS TODO
export const db = getFirestore(app);
export const auth = getAuth(app);

export { collection, addDoc, getDocs, query, where, onAuthStateChanged };
