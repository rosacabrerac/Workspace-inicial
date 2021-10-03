/*Comienzo de Mostrar Productos */

var product = {};

function mostrarImagenProducto(array){

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

/*
function mostrarImagenProducto(array){

    let mostrarFotoAutos = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if (i === 0) {
            mostrarFotoAutos += `
            
            <div class="carousel-item active">
            <div class="d-block mb-4 h-100">
                <img src="` + imageSrc + `" alt="">
            </div>
            </div>
            `
            continue;
        }
            mostrarFotoAutos += `
            
            <div class="carousel-item">
            <div class="d-block mb-4 h-100">
                <img src="` + imageSrc + `" alt="...">
            </div>
            </div>

            `
        document.getElementById("carrusel").innerHTML = mostrarFotoAutos;
    };
};

*/

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

/*Fin de Mostrar Comentarios */


/*Comienzo de Mostrar Fecha */

/**
 * 
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

const fecha = new Date();
const fechaConFormato = formatDate(fecha);

/*Fin de Mostrar Fecha */


/*Comienzo de Publicar Comentario */

enviar = document.getElementById("enviar");

enviar.onclick = function() {

    const comentario = document.getElementById("comentario").value.trim();
    const estrellas = document.getElementById("estrellas").value;

    let addObj = {
        comment: comentario,
        stars: estrellas
    };

    console.log(addObj);

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


/*Fin de Publicar Comentario */


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

/*Fin de Verificar si no hay Comentario */


/*Comienzo de Mostrar Productos Relacionados */

function mostrarProductosRelacionados(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < product.relatedProducts.length; i++) {
        let relacionado = array[product.relatedProducts[i]];

        htmlContentToAppend += `
        
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <div  id="containerAuto">
            <img class="img-fluid img-thumbnail" src=" ${relacionado.imgSrc} " alt="">
            <div id="nombreRelacionado">
                <div id="texto"><a href="products.html" target="_blank">${relacionado.name}</a></div>
            </div>
            </div>
        </div>
        </div>
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
                    
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPriceHTML.innerHTML = product.currency + ` `+ product.cost;
            soldCountHTML.innerHTML = product.soldCount;
            categoryCat.innerHTML = product.category;
            

            //Muestro las imagenes en forma de galería
            mostrarImagenProducto(product.images);
        }
    });

    getJSONData(PRODUCTS_URL).then(function(productObj){
        if (productObj.status === "ok")
        {
            productosRelacionados = productObj.data;

            mostrarProductosRelacionados(productosRelacionados);

        };

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(commentObj){
        if (commentObj.status === "ok")
        {
            commentVar = commentObj.data;

            showComment(commentVar);
        }
    });
});