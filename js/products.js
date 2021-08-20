var categoriesArray = []; // Se crea un array vacío

function showCategoriesList(array){ //Se crea una función que usa como parámetro "array"

    let htmlContentToAppend = ""; // Se crea una variable que va almacenar strings, por eso el ""
    for(let i = 0; i < array.length; i++){ //Se usa un for para pasar los datos del JSON, se inicializa i en 0, el for se va a dar mientras se cumpla la condición y por último aumenta i en 1
        let category = array[i]; //Se crea la variable category y se le asigna el array con la posición correspondiente a i

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                    </div>
                    <div>${category.description}</div>
                    <div>${category.currency} ${category.cost}</div>
                    <div>Vehículos vendidos de este modelo: ${category.soldCount}</div>
                </div>
            </div>
        </div>
        `
        /*Se le agrega lo que está entre `` y a su vez asigna el valor a la variable, por eso aparece los datos de cada auto
        y no sólo el del último*/
        /*Para que aparezcan los datos del JSON en la página se usan los marcadores ${}, que contienen 
        a category (al cual se le asignó array[i]) y con el punto y el nombre de la propiedad se accede a dicha propiedad
        */
        document.getElementById("cat-list-contain").innerHTML = htmlContentToAppend;
        //Con esto se muestra en pantalla lo que se guardó en la variable htmlContentToAppend en el div con id "cat-list-contain"
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});