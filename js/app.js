document.addEventListener("DOMContentLoaded", () => {
  main(); // Llamada a la función main una vez que el DOM esté cargado
});

function main() {
  //Variables
  const form = document.querySelector("#form");
  const headerForm = document.querySelector(".header__form");
  const notesContainer = document.querySelector("#notes");
  let notesArray = [];

  //Funciones
  registerEventListeners();

  function registerEventListeners() {
    form.addEventListener("submit", addNote);
  }

  function addNote(e) {
    e.preventDefault(); //prevenir el comportamiento predeterminado del evento

    const noteText = document.querySelector("#note-textarea").value;

    if (noteText === "") {
      showErrorMessage("No puedes agregar una nota vacía");
      return;
    }
  }

  function showErrorMessage(message) {
    // Buscar un mensaje de error en headerForm
    const existErrorMessage = headerForm.querySelector(".header__error-message");

    if (existErrorMessage) return; // Si ya existe un mensaje de error salir de la función y no hacer nada

    const errorMessage = document.createElement("P");
    errorMessage.textContent = message;
    errorMessage.classList.add("header__error-message");

    headerForm.appendChild(errorMessage);

    //Eliminar el mensaje de error después de 3 segundos
    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }
}
