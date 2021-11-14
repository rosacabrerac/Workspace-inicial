
/* COMIENZO MOSTRAR ARTÍCULOS COMPRADOS */

var carrito = [];

function mostrarCarrito(array) {
    let productosCarrito = "";

    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        if (articulo.currency === "USD") {
            articulo.currency = "UYU";
            articulo.unitCost = articulo.unitCost * 40;
        }
        // let precio = articulo.unitCost;
        // let precioFormateado = new Intl.NumberFormat().format(precio);
        productosCarrito += `
           <div class="carrito-compras">
                <div class="articulo">
                    <div class="imagen-articulo">
                        <img src="${articulo.src}">
                    </div>
                    <div class="propiedades-articulo">
                        <span>${articulo.name}</span>
                        <span id="tipo-articulo">${articulo.type}</span>
                        <div class="precio-articulo">
                            <div class="contenedor-precio"><span>Precio unitario: ${articulo.currency} <span class="monto">${articulo.unitCost}</span></span></div>
                            <span id="precio-subtotal-cantidad">Subtotal: ${articulo.currency} <span id="precioPorCantidad${i}">${articulo.unitCost * articulo.count}</span></span>
                        </div>
                        <div class="cantidad"> <span>Cantidad</span>
                            <input autocomplete="off" type="number" name="name" id="qty" min="1" onchange="precioSubtotal()" value="${articulo.count}">
                            <div class="precio-total">
                            </div>
                        </div>
                        <div class="quitar">
                            <button class="boton-quitar">Quitar artículo</button>
                        </div>
                    </div>  
                </div>
           </div> 
            
        `
        document.getElementById("mostrarProductosCarrito").innerHTML = productosCarrito;
        precioSubtotal();
    }
}

/* FIN MOSTRAR ARTÍCULOS COMPRADOS */


/* COMIENZO MOSTRAR SUBTOTAL */


function precioSubtotal() {
    let precio = document.getElementsByClassName("monto");
    let cantidad = document.getElementsByTagName("input");


    let subtotal = 0;

    for (i = 0; i < precio.length; i++) {

        document.getElementById("precioPorCantidad" + i).innerHTML = parseInt(precio[i].innerHTML) * cantidad[i].value;
        subtotal += parseInt(precio[i].innerText) * cantidad[i].value;
    };

    document.getElementById("mostrar-subtotal").innerHTML = subtotal;
}

/* FIN MOSTRAR SUBTOTAL */


/* COMIENZO CÁLCULO ENVÍO */

let inputEnvio = document.getElementsByName("envio");

function envio() {
    let monto = parseInt(document.getElementById("mostrar-subtotal").innerHTML);
    document.getElementById("monto").innerHTML = "UYU " + monto;
    

    if (inputEnvio[0].checked) {
        monto += ((monto * 5) / 100);
    } else if (inputEnvio[1].checked) {
        monto += ((monto * 7) / 100);
    } else if (inputEnvio[2].checked) {
        monto += ((monto * 15) / 100);
    }

    document.getElementById("sub-envio").innerHTML = "UYU " + monto;

}

/* FIN CÁLCULO ENVÍO */


/* COMIENZO VERIFICAR DATOS */

let pagar = document.getElementById("boton-pagar");
let calle = document.getElementById("calle");
let numero = document.getElementById("numero");
let esquina = document.getElementById("esquina");
let pais = document.getElementById("pais");

pagar.addEventListener("click", (e) => {
    chequearInputs();
});


function chequearInputs() {
    let calleValue = calle.value.trim();
    let numeroValue = numero.value.trim();
    let esquinaValue = esquina.value.trim();
    let paisValue = pais.value.trim();

    if (calleValue === "") {
        mostrarError(calle);
    } else {
        mostrarCorrecto(calle);
    }

    if (numeroValue === "") {
        mostrarError(numero);
    } else {
        mostrarCorrecto(numero);
    }

    if (esquinaValue === "") {
        mostrarError(esquina);
    } else {
        mostrarCorrecto(esquina);
    }

    if (paisValue === "") {
        mostrarError(pais);
    } else {
        mostrarCorrecto(pais);
    }
}

function mostrarError(input) {
    let camposInput = input.parentElement;

    camposInput.className = "campos-input incompleto";
}

function mostrarCorrecto(input) {
    let camposInput = input.parentElement;

    camposInput.className = "campos-input completo";
}


function verificarEnvio() {
    if (inputEnvio[0].checked == true || inputEnvio[1].checked == true || inputEnvio[2].checked == true) {
        
        pagar.style.display = "block";
    }
}

/* FIN VERIFICAR DATOS */


/* COMIENZO MODAL */

let modal = document.getElementById("mdl");

pagar.onclick = function () {
    modal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* COMIENZO CREDITO */

let inputCredito = document.getElementById("input-credito");
let creditoW = document.getElementById("credito-wrapper");

inputCredito.addEventListener("click", function () {
    creditoW.style.display = "block";
    debitoW.style.display = "none";
    cobranzaW.style.display = "none";
})

/* FIN CREDITO */

/* COMIENZO DÉBITO */

let inputDebito = document.getElementById("input-debito");
let debitoW = document.getElementById("debito-wrapper");

inputDebito.addEventListener("click", function () {
    debitoW.style.display = "block";
    creditoW.style.display = "none";
    cobranzaW.style.display = "none";
})

/* FIN DÉBITO */

/* COMIENZO REDES DE COBRANZA */

let inputCobranza = document.getElementById("redes-cobranza");
let cobranzaW = document.getElementById("cobranza-wrapper");

inputCobranza.addEventListener("click", function () {
    cobranzaW.style.display = "block";
    creditoW.style.display = "none";
    debitoW.style.display = "none";
})

/* FIN REDES DE COBRANZA */

/* FIN MODAL */


/* COMIENZO BOTON QUITAR ARTÍCULO 

let quitar = document.getElementsByClassName("boton-quitar");

for (let i = 0; i < quitar.length; i++) {
    let boton = quitar[i];
    boton.addEventListener('click', function () {
        console.log('click');

    })

}

/* FIN BOTON QUITAR ARTÍCULO */



/* COMIENZO MOSTRAR BOTÓN PAGAR DENTRO DEL MODAL */

let botonPagar = document.getElementById("pay");
let radiosEnvio = document.getElementsByName("pago");

function pagarTodo() {
    if(radiosEnvio[0].checked == true || radiosEnvio[1].checked == true || radiosEnvio[2].checked == true) {
        botonPagar.style.display = "block";
    }
}

function compraExitosa() {
    Swal.fire(
        '¡Listo!',
        '¡Su compra se ha realizado con éxito!',
        'success'
      )
}

/* FIN MOSTRAR BOTÓN PAGAR DENTRO DEL MODAL */


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_TWO_PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;

            mostrarCarrito(carrito.articles);
            // mostrarCarrito(carrito.articles);
        }
    });

});