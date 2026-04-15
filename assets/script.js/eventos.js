function abrirModal(titulo) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("tituloEvento").innerText = titulo;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function inscribirse() {
  let nombre = document.getElementById("nombre").value;

  if (nombre === "") {
    document.getElementById("mensaje").innerText = "Ingresa tu nombre";
    return;
  }

  document.getElementById("mensaje").innerText =
    "🎉 Registro exitoso. Eres parte del cambio.";
}
