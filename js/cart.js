var carrito = {}


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
                    </div>  
                </div>
           </div> 
            
        `
        precioSubtotal();
        document.getElementById("mostrarProductosCarrito").innerHTML = productosCarrito;
    }



}

function precioSubtotal() {
    let precio = document.getElementsByClassName("monto");
    let cantidad = document.getElementsByTagName("input");

    let subtotal = 0;

    for (i = 0; i < precio.length; i++) {

        document.getElementById("precioPorCantidad" + i).innerHTML = parseFloat(precio[i].innerHTML) * cantidad[i].value;
        subtotal += parseFloat(precio[i].innerText) * cantidad[i].value;

    };
    document.getElementById("mostrar-subtotal").innerHTML = "UYU " + subtotal;
}


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