
// const modificar = document.getElementById("modificar");
// modificar.onclick = function() {

// }


/*
function cambiarSpan(e) {
        let txt = e.innerText;
        let dato = document.getElementById("mostrar-nombre");
    
        dato.innerHTML = `<input onblur="reseteoSpan(this)" value="${txt}">`;
        document.getElementsByTagName("input")[0].focus();
    }
    cambiarSpan(this);
    
    function reseteoSpan(e) {
        let txt = e.value;
        let dato = document.getElementById("dato");
    
        dato.innerHTML = `<span onclick="cambiarSpan(this)">${txt}</span>`;
    }
    reseteoSpan(this);
*/

/* COMIENZO MODAL */

let modal = document.getElementById("mdl");
let modificar = document.getElementById("modificar");
let cerrar = document.getElementById("cerrar-popup");
let guardar = document.getElementById("guardar")

modificar.onclick = function () {
    modal.style.display = "block";
}

cerrar.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* FIN MODAL */


/* COMIENZO DATOS USUARIO */

function guardarUsuario() {

    datosObj = {
        nombre: document.getElementById("nombre-usuario").value,
        apellido: document.getElementById("apellido-usuario").value,
        edad: document.getElementById("edad-usuario").value,
        email: document.getElementById("email-usuario").value,
        tel: document.getElementById("tel-usuario").value
    }

    localStorage.setItem("datos", JSON.stringify(datosObj));
}

function modificarUsuario() {

    let datos = JSON.parse(localStorage.getItem("datos"));

    document.getElementById("mostrar-nombre").innerHTML = datos.nombre;
    document.getElementById("mostrar-apellido").innerHTML = datos.apellido;
    // document.getElementById("mostrar-edad").innerHTML = datos.edad;
    document.getElementById("mostrar-email").innerHTML = datos.email;
    document.getElementById("mostrar-tel").innerHTML = datos.tel;
}

/* FIN DATOS USUARIO */


/* COMIENZO CÁLCULO EDAD */

const meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function calcularEdad() {
    let hoy = new Date();
    let fechaInput = new Date(document.getElementById("edad-usuario").value);
    let mesNacimiento, diaNacimiento, anioNacimiento;
    let detallesEdad = {
        date: fechaInput.getDate(),
        month: fechaInput.getMonth() + 1,
        year: fechaInput.getFullYear()
    }

    let anioActual = hoy.getFullYear();
    let mesActual = hoy.getMonth() + 1;
    let diaActual = hoy.getDate();

    chequeoBiciesto(anioActual);

    anioNacimiento = anioActual - detallesEdad.year;

    if (mesActual >= detallesEdad.month) {
        mesNacimiento = mesActual - detallesEdad.month;
    }
    else {
        anioNacimiento--;
        mesNacimiento = 12 + mesActual - detallesEdad.month;
    }

    if (diaActual >= detallesEdad.date) {
        diaNacimiento = diaActual - detallesEdad.date;
    }
    else {
        mesNacimiento--;
        let days = meses[mesActual - 2];
        diaNacimiento = days + diaActual - detallesEdad.date;
        if (mesNacimiento < 0) {
            mesNacimiento = 11;
            anioNacimiento--;
        }
    }


    mostrarResultado(anioNacimiento);
}

function mostrarResultado(anioCumple) {
    document.getElementById("mostrar-edad").innerHTML = anioCumple;
}

function chequeoBiciesto(anio) {
    if (anio % 4 == 0 || (anio % 100 == 0 && anio % 400 == 0)) {
        meses[1] = 29;
    } else {
        meses[1] = 28;
    }
}

/* FIN CÁLCULO EDAD */

/* COMIENZO SUBIR IMAGEN */

const inputImagen = document.querySelector("#subir-archivo");
var imagenSubida = "";

inputImagen.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagenSubida = reader.result;
        localStorage.setItem("imagen", imagenSubida)
        document.querySelector("#imagen-perfil").style.backgroundImage = `url(${imagenSubida})`;
        subirImagen();
    })

    reader.readAsDataURL(this.files[0])

})

function subirImagen() {
    const imagenGuardada = localStorage.getItem("imagen");
    if (imagenGuardada) {
        document.querySelector("#vistaImagen").setAttribute("src", imagenGuardada);
    }
}


/* FIN SUBIR IMAGEN */


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    subirImagen();
    modificarUsuario();
});