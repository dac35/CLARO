window.db;
window.addDoc;

// ===============================
// SCROLL SUAVE
// ===============================
function scrollEventos() {
  document.getElementById("eventos").scrollIntoView({
    behavior: "smooth",
  });
}

// ===============================
// CONTADORES ANIMADOS 🔥
// ===============================
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  // ACTIVAR SOLO CUANDO APARECE EN PANTALLA
  const observerCounter = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCounter();
      observerCounter.disconnect(); // ✅ correcto
    }
  });

  observerCounter.observe(counter); // ✅ correcto
});

// ===============================
// ANIMACIÓN AL HACER SCROLL 🔥
// ===============================
const elements = document.querySelectorAll(
  ".evento-card, .beneficio, .stat-card",
);

const observerAnimacion = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

elements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 0.6s ease";

  observerAnimacion.observe(el);
});

// ===============================
// EFECTO 3D EN TARJETAS 😎
// ===============================
const cards = document.querySelectorAll(".evento-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// ===============================
// HEADER DINÁMICO
// ===============================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});

window.addEventListener("load", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      count += target / 50;

      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
});

function irFormulario() {
  window.location.href = "../html/formulario.html";
}

// ===============================
// ESTADO GLOBAL
// ===============================
let eventoActual = null;

// ===============================
// MODAL
// ===============================
function abrirModal(titulo, imgSrc) {
  const modal = document.getElementById("modal");
  const form = modal.querySelector("form");

  document.getElementById("tituloEvento").innerText = titulo;
  document.getElementById("modal-img").src = imgSrc;

  // 🔥 CONTENIDO DINÁMICO + FECHAS REALES
  if (titulo === "Comunicación inclusiva") {
    eventoActual = {
      titulo,
      descripcion:
        "Aprenderás a comunicarte de forma inclusiva, evitando sesgos y promoviendo el respeto en entornos personales y laborales.",
      lugar: "La Victoria",
      start: "20260425T100000",
      end: "20260425T110000",
    };
  }

  if (titulo === "Historias que transforman") {
    eventoActual = {
      titulo,
      descripcion:
        "Conoce historias reales que han generado impacto social y aprende cómo tú también puedes ser parte del cambio.",
      lugar: "Híbrido",
      start: "20260426T160000",
      end: "20260426T170000",
    };
  }

  if (titulo === "Construyamos juntos") {
    eventoActual = {
      titulo,
      descripcion:
        "Participa en un espacio colaborativo donde se desarrollarán ideas para mejorar la inclusión en distintos contextos.",
      lugar: "Virtual",
      start: "20260427T110000",
      end: "20260427T120000",
    };
  }

  // 🔥 pintar datos
  document.getElementById("descripcionEvento").innerText =
    eventoActual.descripcion;
  document.getElementById("lugarEvento").innerText = eventoActual.lugar;

  // reset form
  form.reset();
  document.getElementById("mensaje-exito").innerText = "";

  modal.style.display = "flex";

  configurarModalFunciones();

  const btn = document.querySelector(".btn-confirmar");

  let inscritos = JSON.parse(sessionStorage.getItem("inscritos")) || [];

  if (inscritos.includes(eventoActual.titulo)) {
    btn.innerText = "Inscrito ✅";
    btn.style.background = "green";
    btn.disabled = true;
  } else {
    btn.innerText = "Confirmar inscripción";
    btn.style.background = "#e60000";
    btn.disabled = false;
  }
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function cerrarFuera(e) {
  if (e.target.id === "modal") cerrarModal();
}

// ===============================
// FORMULARIO
// ===============================
/*function enviarFormulario(e) {
  e.preventDefault();

  if (!eventoActual) return;

  const btn = document.querySelector(".btn-confirmar");

  // 🔥 guardar inscritos
  let inscritos = JSON.parse(sessionStorage.getItem("inscritos")) || [];

  // evitar duplicados
  if (!inscritos.includes(eventoActual.titulo)) {
    inscritos.push(eventoActual.titulo);
    sessionStorage.setItem("inscritos", JSON.stringify(inscritos));
  }

  // 🔥 cambiar botón SOLO aquí
  btn.innerText = "Inscrito ✅";
  btn.style.background = "green";
  btn.disabled = true;

  // 🔥 limpiar formulario
  e.target.reset();

  document.getElementById("mensaje-exito").innerText =
    "Te registraste correctamente 🎉";
}*/

async function enviarFormulario(e) {
  e.preventDefault();

  if (!eventoActual) return;

  const btn = document.querySelector(".btn-confirmar");

  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  const companero = document.getElementById("companero").checked;

  try {
    // 🔥 GUARDAR EN FIREBASE
    await window.addDoc(window.collection(window.db, "inscripciones"), {
      nombre,
      codigo,
      evento: eventoActual.titulo,
      fecha: eventoActual.start,
      companero,
      creado: new Date(),
    });

    console.log("✅ Guardado en Firebase");
  } catch (error) {
    console.error("❌ Error Firebase:", error);
  }

  // 🔥 LO QUE YA TENÍAS
  let inscritos = JSON.parse(sessionStorage.getItem("inscritos")) || [];

  if (!inscritos.includes(eventoActual.titulo)) {
    inscritos.push(eventoActual.titulo);
    sessionStorage.setItem("inscritos", JSON.stringify(inscritos));
  }

  btn.innerText = "Inscrito ✅";
  btn.style.background = "green";
  btn.disabled = true;

  e.target.reset();

  document.getElementById("mensaje-exito").innerText =
    "Te registraste correctamente 🎉";
}

// ===============================
// VALIDACIÓN CÓDIGO
// ===============================
const codigoInput = document.getElementById("codigo");
const errorCodigo = document.getElementById("error-codigo");

function validarCodigo(codigo) {
  return /^C\d{5}$/.test(codigo);
}

if (codigoInput) {
  codigoInput.addEventListener("input", () => {
    errorCodigo.textContent = validarCodigo(codigoInput.value)
      ? ""
      : "Código inválido. Ej: C12345";
  });
}

// ===============================
// CONFIGURAR FUNCIONES DEL MODAL
// ===============================
function configurarModalFunciones() {
  const whatsapp = document.getElementById("whatsapp");
  const facebook = document.getElementById("facebook");
  const linkedin = document.getElementById("linkedin");
  const agendaBtn = document.getElementById("agendaBtn");

  if (!eventoActual || !whatsapp || !facebook || !linkedin || !agendaBtn)
    return;

  const url = window.location.href;
  const texto = "Mira este evento de Claro por la Inclusión 👇";

  // ===============================
  // 📲 COMPARTIR
  // ===============================
  whatsapp.href = `https://wa.me/?text=${encodeURIComponent(texto + " " + eventoActual.titulo + " " + url)}`;
  facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  // ===============================
  // 📅 GOOGLE CALENDAR (FIX REAL)
  // ===============================
  agendaBtn.onclick = () => {
    const calendarUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" +
      encodeURIComponent(eventoActual.titulo) +
      "&dates=" +
      eventoActual.start +
      "/" +
      eventoActual.end +
      "&details=" +
      encodeURIComponent(eventoActual.descripcion) +
      "&location=" +
      encodeURIComponent(eventoActual.lugar);

    window.open(calendarUrl, "_blank");

    // guardar local
    let agenda = JSON.parse(localStorage.getItem("agenda")) || [];
    agenda.push(eventoActual);
    localStorage.setItem("agenda", JSON.stringify(agenda));
  };
}

// ===============================
// VALIDACIÓN NOMBRE
// ===============================
const nombre = document.getElementById("nombre");

if (nombre) {
  nombre.addEventListener("input", () => {
    nombre.style.borderColor = nombre.value.length < 5 ? "red" : "red";
  });
}

// ===============================
// SECCION ROJA - PROPONER EVENTO
// ===============================

// ===============================
// FUNCIONES REUTILIZABLES
// ===============================
function validarCodigo(codigo) {
  return /^C\d{5}$/.test(codigo);
}

function obtenerPropuestas() {
  return JSON.parse(localStorage.getItem("propuestas")) || [];
}

function guardarPropuestas(propuestas) {
  localStorage.setItem("propuestas", JSON.stringify(propuestas));
}

function validarCampos(datos) {
  if (!validarCodigo(datos.codigo.value)) return "Código inválido. Ej: C12345";
  if (datos.titulo.value.length < 5) return "Título muy corto";
  if (datos.descripcion.value.length < 10) return "Descripción muy corta";
  if (!datos.fecha.value) return "Selecciona fecha";
  if (!datos.hora.value) return "Selecciona hora";
  return null;
}

// ===============================
// VALIDACIÓN EN TIEMPO REAL
// ===============================
const codigoPropuesta = document.getElementById("codigoPropuesta");
const errorCodigoPropuesta = document.getElementById("error-codigo-propuesta");

if (codigoPropuesta) {
  codigoPropuesta.addEventListener("input", () => {
    if (!validarCodigo(codigoPropuesta.value)) {
      codigoPropuesta.style.borderColor = "red";
      if (errorCodigoPropuesta) {
        errorCodigoPropuesta.textContent = "Ej: C12345";
      }
    } else {
      codigoPropuesta.style.borderColor = "green";
      if (errorCodigoPropuesta) {
        errorCodigoPropuesta.textContent = "";
      }
    }
  });
}

const tituloInput = document.getElementById("tituloPropuesta");
const descripcionInput = document.getElementById("descripcionPropuesta");

if (tituloInput) {
  tituloInput.addEventListener("input", () => {
    tituloInput.style.borderColor =
      tituloInput.value.length < 5 ? "red" : "green";
  });
}

if (descripcionInput) {
  descripcionInput.addEventListener("input", () => {
    descripcionInput.style.borderColor =
      descripcionInput.value.length < 10 ? "red" : "green";
  });
}

// ===============================
// MODAL PROPUESTA
// ===============================
const btnProponer = document.getElementById("btnProponer");

if (btnProponer) {
  btnProponer.addEventListener("click", () => {
    document.getElementById("modalPropuesta").style.display = "flex";
    configurarModalPropuesta();
  });
}

function configurarModalPropuesta() {
  const form = document.getElementById("formPropuesta");
  const mensaje = document.getElementById("mensaje-propuesta");

  if (!form || !mensaje) return;

  form.reset();
  mensaje.innerText = "";

  // 🔄 reset estilos
  form.querySelectorAll("input, textarea").forEach((el) => {
    el.style.borderColor = "#ccc";
  });
}

function cerrarModalPropuesta() {
  document.getElementById("modalPropuesta").style.display = "none";
}

// cerrar haciendo clic afuera
function cerrarFuera(e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
}

// ===============================
// MODALIDAD DINÁMICA
// ===============================
const modalidadSelect = document.getElementById("modalidadPropuesta");
const campoLugar = document.getElementById("campoLugar");
const campoPublico = document.getElementById("campoPublico");
const campoActividades = document.getElementById("campoActividades");

if (modalidadSelect) {
  modalidadSelect.addEventListener("change", () => {
    const valor = modalidadSelect.value;

    if (valor === "Virtual") {
      campoLugar.style.display = "none";
      campoPublico.style.gridColumn = "span 2";
      campoActividades.style.gridColumn = "span 2";
    } else {
      campoLugar.style.display = "flex";
      campoPublico.style.gridColumn = "span 1";
      campoActividades.style.gridColumn = "span 2";
    }
  });
}

// ===============================
// ENVIAR PROPUESTA
// ===============================
async function enviarPropuesta(e) {
  e.preventDefault();

  const form = document.getElementById("formPropuesta");
  const mensaje = document.getElementById("mensaje-propuesta");
  const btn = form.querySelector("button[type='submit']");

  const datos = {
    codigo: form.codigoPropuesta,
    titulo: form.tituloPropuesta,
    descripcion: form.descripcionPropuesta,
    fecha: form.fechaPropuesta,
    hora: form.horaPropuesta,
    modalidad: form.modalidadPropuesta,
    lugar: form.lugarPropuesta,
    publico: form.publicoPropuesta,
    actividades: form.actividadesPropuesta,
  };

  // 🔴 VALIDACIÓN
  const error = validarCampos(datos);

  if (error) {
    mensaje.innerText = error + " ❌";
    mensaje.style.color = "red";

    // 🔥 enfocar campo error
    if (!validarCodigo(datos.codigo.value)) datos.codigo.focus();
    else if (datos.titulo.value.length < 5) datos.titulo.focus();
    else if (datos.descripcion.value.length < 10) datos.descripcion.focus();

    return;
  }

  // 🔥 FORMATO FECHA
  const start =
    datos.fecha.value.replace(/-/g, "") +
    "T" +
    datos.hora.value.replace(":", "") +
    "00";

  const propuesta = {
    codigo: datos.codigo.value,
    titulo: datos.titulo.value,
    descripcion: datos.descripcion.value,
    fecha: datos.fecha.value,
    hora: datos.hora.value,
    modalidad: datos.modalidad.value,
    lugar: datos.lugar.value,
    publico: datos.publico.value,
    actividades: datos.actividades.value,
    start,
    estado: "pendiente",
  };

  // 💾 GUARDAR
  const propuestas = obtenerPropuestas();
  propuestas.push(propuesta);
  guardarPropuestas(propuestas);

  // ✅ FEEDBACK VISUAL
  btn.innerText = "Enviado ✅";
  btn.style.background = "green";

  mensaje.innerText = "Propuesta enviada correctamente 🎉";
  mensaje.style.color = "green";

  // 🔄 RESET BOTÓN
  setTimeout(() => {
    btn.innerText = "Enviar propuesta";
    btn.style.background = "#e60000";
  }, 2000);

  form.reset();

  try {
    await window.addDoc(window.collection(window.db, "propuestas"), propuesta);

    console.log("✅ Propuesta guardada en Firebase");
  } catch (error) {
    console.error("❌ Error Firebase:", error);
  }
}
