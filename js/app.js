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

  //traemos los datos guardados en local storage
  getDataLocalStorage();

  function getDataLocalStorage() {
    // Verificar si hay datos almacenados en el local storage con la clave "notes"
    if (localStorage.getItem("notes")) {
      // Obtener los datos almacenados y convertirlos de nuevo a un array
      notesArray = JSON.parse(localStorage.getItem("notes"));

      // actualizar el contenido HTML con los datos obtenidos
      updateNotesHTML();
    }
  }

  registerEventListeners();

  function registerEventListeners() {
    form.addEventListener("submit", addNote);
  }

  function addNote(e) {
    e.preventDefault(); //prevenir el comportamiento predeterminado del evento

    //obtener el texto ingresado en el textarea
    const noteText = document.querySelector("#note-textarea").value;

    if (noteText === "") {
      showErrorMessage("No puedes agregar una nota vacía");
      return;
    }

    //si el usuario ingreso texto
    let note = {
      id: Date.now(),
      text: noteText,
      date: getCurrentDate(),
    };

    notesArray.push(note);

    //Actualizar el HTML con la nueva nota agregada
    updateNotesHTML();

    //Reiniciar el note-textarea
    form.reset();
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

  function getCurrentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}/${month}/${year}`;
  }

  function updateNotesHTML() {
    //Limpiar el HTML
    clearHTML();

    if (notesArray.length > 0) {
      //Crear una nota en el HTML por cada elemento de notesArray
      notesArray.forEach((note) => {
        let { id, text, date } = note;

        notesContainer.insertAdjacentHTML(
          "afterbegin",
          ` 
            <div class="note">
            <p class="note__text">${text}</p>
            <div class="note__info">
              <p class="note__date">${date}</p>
              <button id="btn-delete" class="note__btn-delete" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="note__btn-delete-logo"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        `
        );
      });
    }

    //Agrega las notas actuales a local storage
    syncLocalStorage();
  }

  // eliminar todo el contenido HTML de notesContainer
  function clearHTML() {
    // Mientras exista un primer hijo en notesContainer
    while (notesContainer.firstChild) {
      // Remover el primer hijo de notesContainer
      notesContainer.removeChild(notesContainer.firstChild);
    }
  }

  function syncLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
}
