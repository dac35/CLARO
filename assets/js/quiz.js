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
let current = 0;
let score = 0;
let time = 10;
let interval;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const timeBar = document.getElementById("timeBar");
const nextBtn = document.getElementById("nextBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const tickSound = document.getElementById("tickSound");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (!name || !email) {
    alert("Completa todos los campos");
    return;
  }

  // guardar datos
  localStorage.setItem("nombre", name);
  localStorage.setItem("email", email);

  // ocultar pantalla inicial
  document.getElementById("startScreen").style.display = "none";

  // mostrar quiz
  document.getElementById("quizContainer").style.display = "block";

  // iniciar quiz
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

    // 🔊 tick
    tickSound.currentTime = 0;
    tickSound.play();

    let percent = (time / 10) * 100;
    timeBar.style.width = percent + "%";

    if (time <= 5) {
      timeBar.style.background = "#ff9800";
    }
    if (time <= 3) {
      timeBar.style.background = "#e60000";
    }

    if (time <= 0) {
      clearInterval(interval);
      disableOptions();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => checkAnswer(btn, opt);
    optionsEl.appendChild(btn);
  });

  startTimer();
}
startBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (!name || !email) {
    alert("Completa todos los campos");
    return;
  }

  correctSound.play().then(() => correctSound.pause());
  wrongSound.play().then(() => wrongSound.pause());
  tickSound.play().then(() => tickSound.pause());

  localStorage.setItem("nombre", name);
  localStorage.setItem("email", email);

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";

  loadQuestion();
});
function checkAnswer(button, selected) {
  if (answered) return;

  answered = true;
  clearInterval(interval);

  const correct = questions[current].answer;

  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach((btn) => {
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });

  if (selected === correct) {
    score += 10;
    button.classList.add("correct");
    correctSound.play();
  } else {
    button.classList.add("wrong");
    wrongSound.play();
  }

  scoreEl.textContent = `⭐ ${score}`;
  nextBtn.disabled = false;
}

function disableOptions() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

function nextQuestion() {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  import("./puntaje.js").then(({ mostrarResultado }) => {
    mostrarResultado(score);
  });
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
