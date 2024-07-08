document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".boton");
  submitButton.addEventListener("click", submitForm);
  // Añadir eventos de escucha a los campos del formulario
  addFieldListeners();
});

// Añadir eventos de escucha a los campos del formulario
function addFieldListeners() {
  const form = document.querySelector(".formulario");
  form.querySelectorAll("input, textarea").forEach((element) => {
    element.addEventListener("input", () => {
      const fieldName = element.name;
      const fieldValue = element.value.trim();
      validateField(fieldName, fieldValue);
    });
  });
}

// Función para limpiar los mensajes de error de un campo específico
function clearFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`); // Buscar cualquier elemento con el atributo name igual a fieldName
  if (field) {
    const groupDiv = field.closest(".group");
    const errorContainer = groupDiv.querySelector(".error-message");
    if (errorContainer) {
      errorContainer.remove();
    }
  }
}

function validateField(fieldName, fieldValue) {
  clearFieldError(fieldName);

  if (fieldName === "name") {
    if (!fieldValue) {
      showFieldError(fieldName, "El nombre es obligatorio");
    } else if (!isValidName(fieldValue)) {
      showFieldError(fieldName, "Formato de nombre inválido");
    }
  }

  if (fieldName === "email") {
    if (!fieldValue) {
      showFieldError(fieldName, "El correo electrónico es obligatorio");
    } else if (!isValidEmail(fieldValue)) {
      showFieldError(fieldName, "Formato de correo electrónico inválido");
    }
  }

  if (fieldName === "message") {
    if (!fieldValue) {
      showFieldError(fieldName, "El mensaje es obligatorio");
    } else if (!isValidText(fieldValue)) {
      showFieldError(fieldName, "Formato de mensaje inválido");
    }
  }
}

// Función para validar los campos de entrada
function isValidName(name) {
  const nameRegex = /^[a-zA-Z-' ]*$/;
  return nameRegex.test(name);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidText(text) {
  // Permite solo letras, números y algunos signos de puntuación básicos
  const textRegex = /^[a-zA-ZÀ-ÿ0-9\s.,!?()\-'"@%&]+$/;
  return textRegex.test(text);
}

function showFieldError(fieldName, errorMessage) {
  const field = document.querySelector(`[name="${fieldName}"]`); // Buscar cualquier elemento con el atributo name igual a fieldName
  if (field) {
    const groupDiv = field.closest(".group");
    let errorContainer = groupDiv.querySelector(".error-message");

    if (!errorContainer) {
      errorContainer = document.createElement("div");
      errorContainer.className = "error-message";
      groupDiv.appendChild(errorContainer);
    }

    errorContainer.innerHTML = errorMessage;
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
}

function validateForm() {
  clearErrors();
  const form = document.querySelector(".formulario");
  let isValid = true;

  form.querySelectorAll("input, textarea").forEach((input) => {
    const fieldName = input.name;
    const fieldValue = input.value.trim();

    if (fieldName === "name") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El nombre es obligatorio");
      } else if (!isValidName(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de nombre inválido");
      }
    }

    if (fieldName === "email") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El correo electrónico es obligatorio");
      } else if (!isValidEmail(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de correo electrónico inválido");
      }
    }

    if (fieldName === "message") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El mensaje es obligatorio");
      } else if (!isValidText(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de mensaje inválido");
      }
    }
  });

  return isValid;
}

/*=============== ENVIO DE FORMULARIO ===============*/
function submitForm(event) {
  event.preventDefault();

  const form = document.querySelector(".formulario");
  let alerta = form.querySelector(".enviado");

  // Si ya existe una alerta en el DOM, elimínala
  if (alerta) {
    alerta.remove();
  }

  if (validateForm()) {
    // Crea una nueva alerta
    alerta = document.createElement("P");
    alerta.textContent = "El mensaje fue enviado";
    alerta.classList.add("enviado");
    form.appendChild(alerta);

    Swal.fire({
      icon: "success",
      title: "¡Formulario válido!",
      text: "Enviando datos...",
      timer: 2000,
    });

    form.reset();

    // Elimina la alerta después de 2 segundos
    // setTimeout(() => {
    //   if (alerta) {
    //     alerta.remove(); // Eliminamos el elemento HTML
    //   }
    // }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, corrige los errores en el formulario antes de enviarlo.",
    });
  }
}