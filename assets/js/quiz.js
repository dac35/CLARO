import { guardarResultado } from "./ranking.js";

let current = 0;
let score = 0;
let correctCount = 0;
let time = 10;
let interval;
let answered = false;
let startTime = 0;
let puntosPorPregunta = 10;

const questions = [
  {
    question: "¿Qué significa DEI?",
    options: [
      "Diversidad, Equidad e Inclusión",
      "Desarrollo, Educación e Innovación",
      "Derechos, Ética e Igualdad",
      "Datos, Estrategia e Impacto",
    ],
    answer: "Diversidad, Equidad e Inclusión",
  },
  {
    question: "¿Qué busca la diversidad?",
    options: [
      "Eliminar diferencias",
      "Valorar las diferencias entre personas",
      "Hacer a todos iguales",
      "Ignorar las culturas",
    ],
    answer: "Valorar las diferencias entre personas",
  },
  {
    question: "¿Qué significa equidad?",
    options: [
      "Dar lo mismo a todos",
      "Dar ventajas a algunos",
      "Dar oportunidades justas según necesidades",
      "Ignorar las diferencias",
    ],
    answer: "Dar oportunidades justas según necesidades",
  },
  {
    question: "¿Qué promueve la inclusión?",
    options: [
      "Excluir a personas diferentes",
      "Crear espacios donde todos se sientan parte",
      "Trabajar solo con iguales",
      "Evitar la participación",
    ],
    answer: "Crear espacios donde todos se sientan parte",
  },
  {
    question: "¿Por qué es importante la DEI en el trabajo?",
    options: [
      "Para evitar trabajar",
      "Para crear ambientes más justos y colaborativos",
      "Para reducir equipos",
      "Para limitar ideas",
    ],
    answer: "Para crear ambientes más justos y colaborativos",
  },
  {
    question: "¿Qué implica la inclusión en un equipo?",
    options: [
      "Escuchar y respetar a todos",
      "Ignorar opiniones",
      "Solo aceptar una idea",
      "Excluir a algunos",
    ],
    answer: "Escuchar y respetar a todos",
  },
  {
    question: "¿La diversidad incluye qué aspecto?",
    options: [
      "Solo edad",
      "Solo género",
      "Diferencias como cultura, género y pensamiento",
      "Solo nacionalidad",
    ],
    answer: "Diferencias como cultura, género y pensamiento",
  },
  {
    question: "¿Qué pasa cuando aplicamos DEI?",
    options: [
      "Hay menos respeto",
      "Se crean ambientes negativos",
      "Se generan espacios más humanos y colaborativos",
      "Se eliminan oportunidades",
    ],
    answer: "Se generan espacios más humanos y colaborativos",
  },
  {
    question: "¿Qué acción refleja equidad?",
    options: [
      "Dar lo mismo a todos",
      "Ignorar necesidades",
      "Apoyar según lo que cada persona necesita",
      "Excluir a algunos",
    ],
    answer: "Apoyar según lo que cada persona necesita",
  },
  {
    question: "¿Qué busca esta trivia?",
    options: [
      "Confundir al usuario",
      "Evaluar conocimientos sobre inclusión",
      "Eliminar ideas",
      "Reducir participación",
    ],
    answer: "Evaluar conocimientos sobre inclusión",
  },
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const timeBar = document.getElementById("timeBar");

const startBtn = document.getElementById("startBtn");

window.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombre");
  const terminado = localStorage.getItem("quizTerminado");

  if (nombre && terminado === "true") {
    window.location.href = "certificado.html";
    return;
  }

  if (nombre) {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    startTime = Date.now();
    loadQuestion();
  }
});

startBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (!name || !email) return;

  localStorage.setItem("nombre", name);
  localStorage.setItem("email", email);

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";

  startTime = Date.now();
  loadQuestion();
});

function startTimer() {
  clearInterval(interval);
  time = 10;
  timerEl.textContent = `⏱ ${time}`;
  timeBar.style.width = "100%";

  interval = setInterval(() => {
    time--;
    timerEl.textContent = `⏱ ${time}`;
    timeBar.style.width = (time / 10) * 100 + "%";

    if (time <= 0) {
      clearInterval(interval);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  answered = false;

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selected) {
  if (answered) return;

  answered = true;
  clearInterval(interval);

  if (selected === questions[current].answer) {
    score += puntosPorPregunta;
    correctCount++;
  }

  scoreEl.textContent = `⭐ ${score}`;

  setTimeout(() => {
    nextQuestion();
  }, 1000);
}

function nextQuestion() {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

async function endGame() {
  const totalTime = Math.floor((Date.now() - startTime) / 1000);

  const nombre = localStorage.getItem("nombre");
  const email = localStorage.getItem("email");

  localStorage.setItem("quizTerminado", "true");
  localStorage.setItem("puntajeFinal", score);
  window.location.href = "certificado.html";
  localStorage.setItem("tiempoFinal", totalTime);

  await guardarResultado({
    nombre,
    email,
    puntaje: score,
    correctas: correctCount,
    tiempo: totalTime,
    fecha: new Date().toISOString(),
  });

  if (score >= 80) {
    window.location.href = "certificado.html";
  } else if (score >= 50) {
    window.location.href = "juego2.html";
  } else {
    alert("Vas a repetir el quiz");
    current = 0;
    score = 0;
    correctCount = 0;
    startTime = Date.now();
    loadQuestion();
  }
}
