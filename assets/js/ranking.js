import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function obtenerRanking() {
  const q = query(
    collection(db, "puntajes"),
    orderBy("puntaje", "desc"),
    limit(10),
  );

  const snapshot = await getDocs(q);

  const lista = [];

  snapshot.forEach((doc) => {
    lista.push(doc.data());
  });

  return lista;
}
