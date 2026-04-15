window.addEventListener("DOMContentLoaded", function () {
  console.log("JS cargado");

  document
    .getElementById("formEvento")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Inscripción enviada 🚀");
    });

  const evento = localStorage.getItem("eventoSeleccionado");
  if (evento) {
    document.querySelector("select").value = evento;
  }
});

function volver() {
  window.history.back();
}
