//-------------------------------------  Eventos de Formulario ---------------------------------------
const datos = {
    nombre: ' ',
    email: ' ',
    texto: ' '
}

const nombreInput = document.querySelector("#nombre");
const emailInput = document.querySelector("#email");
const textoInput = document.querySelector("#texto");

nombreInput.addEventListener("input", leerTexto);
emailInput.addEventListener("input", leerTexto);
textoInput.addEventListener("input", leerTexto);

function leerTexto(evento){
    datos[evento.target.id] = evento.target.value;
    console.log(datos);
}

//-------------------------------------  Validar Formulario ---------------------------------------
const formulario = document.querySelector(".formulario");
formulario.addEventListener("submit", function(evento){
    evento.preventDefault();
    
    //validar formulario
    const {nombre, email, texto} = datos;
    if(nombre === ' ' || email === ' ' || texto === ' '){
        mostrarAlerta("Todos los campos son obligatorios", true)
        return; // corta la ejecución del codigo.
    }else {
        mostrarAlerta("El mensaje fue enviado");
        return;
    }
});

function mostrarAlerta (mensaje, error=null){
    const alerta = document.createElement('P');
    alerta.textContent = mensaje //aqui imprime el mensaje
    if(error){
        alerta.classList.add("error");
    }else{
        alerta.classList.add("enviado");
    }

    formulario.appendChild(alerta);
    
    setTimeout(() => {
        alerta.remove();
    }, 1000);
}
