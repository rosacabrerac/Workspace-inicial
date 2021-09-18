var rating = []; //Comienzo creando un array vacío

function showRating(score){


        if(!score) { // Si el número de estrellas es 0, devuelve un div vacío. Aún así esto no sucede porque todos los comentarios tienen al menos una estrella y los que se pueden publicar desde el comentario tienen la opción de calificar con una estrella o más y siempre con números enteros..
            return `<div></div>`;
        } else {
        return `
        <div class="rating" style="color: #ffc000">
            <span>
                <i class="${
                    score >=1
                    ? 'fa fa-star'
                    : score >= 0.5
                    ? 'fa fa-star-half-o'
                    : 'fa fa-star-o'}">
                </i>
            </span>
            <span>
                <i class="${
                    score >=2
                    ? 'fa fa-star'
                    : score >= 1.5
                    ? 'fa fa-star-half-o'
                    : 'fa fa-star-o'}">
                </i>
            </span>
            <span>
                <i class="${
                    score >=3
                    ? 'fa fa-star'
                    : score >= 2.5
                    ? 'fa fa-star-half-o'
                    : 'fa fa-star-o'}">
                </i>
            </span>
            <span>
                <i class="${
                    score >=4
                    ? 'fa fa-star'
                    : score >= 3.5
                    ? 'fa fa-star-half-o'
                    : 'fa fa-star-o'}">
                </i>
            </span>
            <span>
                <i class="${
                    score >=5
                    ? 'fa fa-star'
                    : score >= 4.5
                    ? 'fa fa-star-half-o'
                    : 'fa fa-star-o'}">
                </i>
            </span>
        </div>
        `
                };
    };

/* En la comparación de estrellas, el ? significa "return", : significa "else", ya que utilicé el operador condicional ternario.
Comparo el "score" del array de comentarios con números del 1 al 5, aumentando de 0,5 en 0,5. Dependiendo del valor, es la cantidad de estrellas
llenas, medio llenas o vacías. */

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(commObj){
        if (commObj.status === "ok")
        {
            rating = commObj.data;

            showRating(rating);
        }
    });
});