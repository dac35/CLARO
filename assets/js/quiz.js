import { mostrarResultado } from "./puntaje.js";

let indice = 0;
let puntaje = 0;

siguienteBtn.onclick = () => {
  indice++;

  if (indice < preguntas.length) {
    cargarPregunta();
  } else {
    mostrarResultado(puntaje);
  }
};
