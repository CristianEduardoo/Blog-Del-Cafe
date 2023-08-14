//-------------------------------------  Eventos de Formulario ---------------------------------------
const datos = {
    nombre: ' ',
    email: ' ',
    texto: ' '
}

const nombreInput = document.querySelector("#nombre");//ID del HTML
const emailInput = document.querySelector("#email");
const textoInput = document.querySelector("#texto");

nombreInput.addEventListener("input", leerTexto);//input=evento
emailInput.addEventListener("input", leerTexto);
textoInput.addEventListener("input", leerTexto);

function leerTexto(evento) {
    datos[evento.target.id] = evento.target.value;
    console.log(datos);
}

//-------------------------------------  Validar Formulario ---------------------------------------
const formulario = document.querySelector(".formulario");
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Reiniciar contadores
    let arroba = 0;
    let punto = false;

    // Validar campos vacíos
    const { nombre, email, texto } = datos;
    if (nombre === '' || email === '' || texto === '') {
        mostrarAlerta("Todos los campos son obligatorios", true);
        return;
    }

    // Validar email
    for (let i = 0; i < email.length; i++) {
        if (email.charAt(i) === '@') {
            arroba++;
        }

        if (email.charAt(i) === '.') {
            punto = true;
        }
    }

    if (arroba === 0 || punto === false) {
        mostrarAlerta("Email no válido", true);
        return;
    }

    // Mostrar mensaje de éxito
    mostrarAlerta("El mensaje fue enviado");
});


function mostrarAlerta(mensaje, error = null) {
    const alerta = document.createElement('P'); //creando codigo HTML, siempre en mayusculas
    alerta.textContent = mensaje //aqui imprime el mensaje
    if (error) {
        alerta.classList.add("error");
    } else {
        alerta.classList.add("enviado");
    }

    formulario.appendChild(alerta);//nos permite subirlo al documento HTML final

    setTimeout(() => {
        alerta.remove();//eliminamos el elemento HTML
    }, 1000);
}
