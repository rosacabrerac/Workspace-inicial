/*Comienzo de Mostrar Productos */

var product = {};

function showProduct(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    };
};

/*Utilicé el mismo estilo que en categories-info para las imágenes del producto, porque es la única parte que es un array. Para el resto de las partes
del objeto, utilicé distintos divs con id a los cuales se les "imprime" las propiedades del objeto (el texto de la descripción, el precio, etc.). */

/*Fin de Mostrar Productos */


/*Comienzo de Mostrar Comentarios */

var commentVar = [];

function showComment(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
        let comm = array[i];

        htmlContentToAppend += `
                <div id="comentarios">
                    <div class="comentario">${comm.user}</div>
                    <div>${comm.description}</div>
                    <div class="rating">${showRating(comm.score)}</div>
                    <div>${comm.dateTime}</div>
                </div>
            
        
        `
        
        document.getElementById("comm-list-contain").innerHTML = htmlContentToAppend;
    
    };
};

/*Como el JSON de comentarios sí es un array, puedo usar un bucle for para pasar por cada uno de los objetos que contienen a los distintos comentarios.
Para que aparezcan las estrellas, simplemente dentro del marcador para éstas (envuelto en las corchetes y con el signo de pesos delante),
invoco a la función que creé para mostrarlas y le paso como parámetro el array y la propiedad a la que quiero acceder. */

/*Fin de Mostrar Comentarios */



/*Comienzo de Publicar Comentario */

const enviar = document.getElementById("enviar")


enviar.onclick = function() {

    const comentario = document.getElementById("comentario").value.trim();
    const estrellas = document.getElementById("estrellas").value;

    let addObj = {
        comment: comentario,
        stars: estrellas
    }

    let vals = Object.values(addObj);

    let info = "";
        info = `
                <div id="publicado">
                    <div class="comentario">${localStorage.getItem("nombre")}</div>
                    <div>${vals[0]}</div>
                    <div>${showRating(vals[1])}</div>
                    <div>${fechaConFormato}</div>
                </div>
        `
        document.getElementById("newComm-list-contain").innerHTML = info;

        document.getElementById("comentario").value = "";
        enviar.disabled = true;
};

/*Para publicar un comentario nuevo, en el html de product-info creé el campo textarea y un botón de enviar. No los puse dentro de la etiqueta
"form" para evitar que la página se actualice al presionar el botón ya que no pude solucionarlo con el método prevenDefault().
Con la propiedad onclick se lleva a cabo la función que mostrará en pantalla el nuevo comentario. Para ello guardo en sus respectivas constantes
los valores de comentario y estrellas (ingresados por el usuario). Luego creo un objeto con dichos valores y como no puedo usar la propiedad length
porque las propiedades de un objeto no están indexadas, utilizo el método Object.values() para crear un objeto iterable (un array).
Así, a través de la plantilla literal asignada a "info", muestro el nombre de usuario guardado en el localStorage, el comentario que tiene la posición
0, las estrellas que tienen la posición 1 (todo dentro del nuevo array creado - vals) y la fecha y lo muestro en un div específico con innerHTML.
Con el código de la línea 92 lo que hago es vaciar la caja de comentarios asignándole como valor un string vacío. */

/*Fin de Publicar Comentario */


/*Comienzo de Mostrar Fecha */

/**
 * Esto se llama "code hinting", no sé si tiene un nombre en español, pero básicamente es para "avisarle" al editor de texto (en este caso VS Code)
 * que dateObject va a ser un objeto de tipo Date. Tener ese objeto va a facilitar poder llamar a los métodos correspondientes al año, mes, etc.
 * @param {Date} dateObject 
 */

 function formatDate(dateObject) {
    const partes = {
        año: dateObject.getFullYear(),
        mes: (dateObject.getMonth() + 1).toString().padStart(2, "0"),
        dia: dateObject.getDate(),
        hora: dateObject.getHours().toString().padStart(2, "0"),
        minutos: dateObject.getMinutes().toString().padStart(2, "0"),
        segundos: dateObject.getSeconds().toString().padStart(2, "0")

    };
    

    return `${partes.año}-${partes.mes}-${partes.dia} ${partes.hora}:${partes.minutos}:${partes.segundos}`
};

const fecha = new Date(); //Con Date() se obtiene la fecha pero con un formato específico que no queda bien con el resto de los comentarios.
const fechaConFormato = formatDate(fecha);

/*Para mostrar la fecha con las mismas características de las presentes en el array de comentarios, creé un objeto dentro de una función, el cual
va a tener las propiedades para cada parte de la fecha. Para el mes, es necesario sumarle 1 ya que el método getMonth() obtiene los meses de 0 a 11.
Para la hora, minutos y segundos, es necesario convertirlos en string para luego usar el método padStart() que, según Mozilla Developers,
rellena la cadena actual (la hora, por ejemplo) de modo que la cadena resultante alcance la longitud dada. En este caso esa longitud es 2 y se le
proporciona el string con el cual se va a rellenar, en este caso "0" para que aparezca delante del número de hora. */

/*Fin de Mostrar Fecha */



/*Comienzo de Verificar si no hay Comentario */

function verificarComentario() {
    const commentInput = document.getElementById("comentario");
    const sendInput = document.getElementById("enviar");

    commentInput.addEventListener("keyup", (e) =>{
        const value = e.currentTarget.value;
        if(value === "") {
            sendInput.disabled = true;
        } else {
            sendInput.disabled = false;
        }
    });
};
verificarComentario();

/* Con esta función lo que logro es evitar que se envíen comentarios vacíos. Mi botón de enviar está deshabilitado por defecto. Con el método
addEvenListener creo una función que se va a llevar a cabo cada vez que el evento "keyup" se produce en la caja de comentarios. Si "value", 
que tiene asignado el valor currentTarget.value que es una propiedad del evento. Esto hace que "value" tenga el valor de lo que se escriba en 
la caja de comentarios. Si "value" tiene está vacío, el botón sigue deshabilitado, de lo contrario, se habilita.
 */

/*Fin de Verificar si no hay Comentario */


/*Comienzo de Mostrar Productos Relacionados */

function mostrarProductosRelacionados(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < product.relatedProducts.length; i++) {
        let relacionado = array[product.relatedProducts[i]];

        htmlContentToAppend += `
        
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <div> <a href="products.html" target="_blank"><img class="img-fluid img-thumbnail" src=" ${relacionado.imgSrc} " alt=""></a>
            </div>
            </div>
        </div>
        </div>
        <br>
        `
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    };
};

/*Fin de Mostrar Productos Relacionados */


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceHTML = document.getElementById("productPrice");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryCat = document.getElementById("category");
            let relatedProducts = document.getElementById("relatedProducts");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPriceHTML.innerHTML = product.currency + ` `+ product.cost;
            soldCountHTML.innerHTML = product.soldCount;
            categoryCat.innerHTML = product.category;
            relatedProducts.innerHTML = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showProduct(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(commentObj){
        if (commentObj.status === "ok")
        {
            commentVar = commentObj.data;

            showComment(commentVar);
        }
    });

    getJSONData(PRODUCTS_URL).then(function(productObj){
        if (productObj.status === "ok")
        {
            productosRelacionados = productObj.data;

            mostrarProductosRelacionados(productosRelacionados);

        }

    });
});