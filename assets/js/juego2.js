let dataDrag = "";
let puntajeJuego2 = 0;
let fraseActual = 0;

const sonidoCorrecto = new Audio("/assets/sounds/correcto.mp3");
const sonidoError = new Audio("/assets/sounds/error.mp3");

const frases = [
  {
    texto:
      'La <span id="drop1" class="drop"></span> es importante porque promueve la <span id="drop2" class="drop"></span> entre las personas.',
    respuestas: ["diversidad", "equidad"],
    opciones: ["diversidad", "equidad", "inclusión"],
  },
  {
    texto:
      'La <span id="drop1" class="drop"></span> permite un entorno más <span id="drop2" class="drop"></span>.',
    respuestas: ["inclusión", "justo"],
    opciones: ["inclusión", "justo", "respeto"],
  },
  {
    texto:
      'La <span id="drop1" class="drop"></span> ayuda a reducir la <span id="drop2" class="drop"></span> social.',
    respuestas: ["educación", "desigualdad"],
    opciones: ["educación", "desigualdad", "equidad"],
  },
  {
    texto:
      'El <span id="drop1" class="drop"></span> fomenta el <span id="drop2" class="drop"></span> cultural.',
    respuestas: ["respeto", "diálogo"],
    opciones: ["respeto", "diálogo", "inclusión"],
  },
  {
    texto:
      'La <span id="drop1" class="drop"></span> fortalece la <span id="drop2" class="drop"></span> en la sociedad.',
    respuestas: ["igualdad", "convivencia"],
    opciones: ["igualdad", "convivencia", "diversidad"],
  },
];

// 🔥 DRAG
function activarDrags() {
  document.querySelectorAll(".drag").forEach((drag) => {
    drag.addEventListener("dragstart", () => {
      dataDrag = drag.textContent;
    });
  });
}

// 🔥 DROP
function activarDrops() {
  document.querySelectorAll(".drop").forEach((drop) => {
    drop.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    drop.addEventListener("drop", () => {
      drop.textContent = dataDrag;
    });
  });
}

// 🔥 CARGAR FRASE
function cargarFrase() {
  const f = frases[fraseActual];

  document.querySelector(".frase").innerHTML = f.texto;

  const cont = document.querySelector(".opciones");
  cont.innerHTML = "";

  f.opciones.forEach((op) => {
    const div = document.createElement("div");
    div.className = "drag";
    div.draggable = true;
    div.textContent = op;
    cont.appendChild(div);
  });

  activarDrags();
  activarDrops();
  actualizarBoton();
}

// 🔥 BOTÓN DINÁMICO
function actualizarBoton() {
  const btn = document.getElementById("btnNext");

  if (fraseActual === frases.length - 1) {
    btn.textContent = "Finalizar";
  } else {
    btn.textContent = "Continuar";
  }
}

// 🔥 VERIFICAR (ARREGLADO SIN BUG DE PUNTOS)
function verificar() {
  const f = frases[fraseActual];

  const d1 = document.getElementById("drop1").textContent;
  const d2 = document.getElementById("drop2").textContent;

  const feedback = document.getElementById("feedback");

  const esCorrecto = d1 === f.respuestas[0] && d2 === f.respuestas[1];

  if (esCorrecto) {
    puntajeJuego2 += 8;
    feedback.textContent = "✔ Correcto";
    feedback.className = "correcto";
    sonidoCorrecto.play();
  } else {
    feedback.textContent = "❌ Incorrecto";
    feedback.className = "error";
    sonidoError.play();
  }

  document.getElementById("puntaje").textContent = puntajeJuego2;

  setTimeout(() => {
    fraseActual++;

    if (fraseActual < frases.length) {
      cargarFrase();
      feedback.textContent = "";
    } else {
      terminarJuego();
    }
  }, 900);
}

// 🔥 FINAL
function terminarJuego() {
  let puntajeFinal = Number(localStorage.getItem("puntajeFinal") || 0);
  puntajeFinal += puntajeJuego2;

  localStorage.setItem("puntajeFinal", puntajeFinal);

  if (puntajeFinal >= 80) {
    localStorage.setItem("pasoJuego2", "true");
    window.location.href = "certificado.html";
  } else {
    alert("No llegaste a 80 puntos. Intenta de nuevo.");
    window.location.href = "trivia.html";
  }
}

// 🔥 INIT
window.addEventListener("DOMContentLoaded", () => {
  cargarFrase();
});
