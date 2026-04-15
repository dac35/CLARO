import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBarIe805-TVF4YUKSoCgS3QfPh-Ehz5gk",
  authDomain: "claro-b4234.firebaseapp.com",
  projectId: "claro-b4234",
  storageBucket: "claro-b4234.firebasestorage.app",
  messagingSenderId: "723168200360",
  appId: "1:723168200360:web:91345a9e017966cc50a49d",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
