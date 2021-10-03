const ORDENAR_PRECIO_ASC = "Precio Asc."; // Creamos 3 constantes y le asignamos un string que va a dar el criterio para ordenar nuestros productos
const ORDENAR_PRECIO_DESC = "Precio Desc.";
const ORDENAR_POR_RELEV = "Relev.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined; // "undefined" es el valor dado a las variables a las que aún no se les ha asignado un valor.
var costoMin = undefined;
var costoMax = undefined;

function ordenarProductos(criterio, array){
    let resultado = [];
    if (criterio === ORDENAR_PRECIO_ASC)
    {
        resultado = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDENAR_PRECIO_DESC){
        resultado = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDENAR_POR_RELEV){
        resultado = array.sort(function(a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
    }

    return resultado;
}
/*La función "ordenarProductos" toma como parámetros un criterio y un array. Lo que sucede dentro de la función
es que el método sort. Este método puede ordenar un array alfabéticamente, pero con los números puede generar conflictos
ya que los convierte en string, entonces si tuviéramos un array con los números [1, 13, 5, 23, 3], sort los ordenaría de la
siguiente forma: [1, 13, 23, 3, 5], lo cual no es exactamente correcto para lo que buscamos.
Debido a lo anteriormente explicado, es que tenemos que utilizar una función callback, ésta "es una función que se pasa a otra
función como un argumento" según developer.mozilla.org.
Retomando... lo que se hace en esta función es que se le "provee" la función callback al método, que toma los parámetros a y b
y los compara (en este caso compara el costo/precio de los autos). La función callback devuelve un valor negativo si a va antes
que b, 0 si a y b son iguales o un valor positivo si a va después de b. Simplemente se restan los dos números (precios) que
serán comparados y según el resultado es el orden en que se van posicionando en el array que se guarda (es asignado) en resultado.*/


function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((costoMin == undefined) || (costoMin != undefined && parseInt(category.cost) >= costoMin)) &&
            ((costoMax == undefined) || (costoMax != undefined && parseInt(category.cost) <= costoMax))){

                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <a href="product-info.html"><img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail"></a>
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
        }

        document.getElementById("cat-list-contain").innerHTML = htmlContentToAppend;
    }
}
/*El condicional dentro de la función para mostrar nuestros productos es para el filtrado de precios ingresados por el usuario.
Si la variable sigue sin tener un valor asignado *O* costoMin tiene asignado un valor (ingresado por el usuario) *Y* el costo del auto (que es
un string por estar en el array y por eso es necesario usar la función parseInt para convertirlo en un entero) es mayor o igual/menor o igual
a costoMax, se lleva a cabo el resto de la función. */

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = ordenarProductos(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

/*El evento "keyup" se lleva a cabo cuando se deja de presionar una tecla. Luego se lleva a cabo la función callback cada vez que
ocurra el evento "keyup". Luego usamos la propiedad target que referencia al objeto, que si no entiendo mal, sería el campo de búsqueda,
ya que con ".value" lo que se hace es "recupera" o acceder al valor/letras que se ingresan en éste (el campo de búsqueda).
Con el método filter, filtramos el array con los productos para verificar que éstos contengan las letras/palabras que se escriben en
el campo de búsqueda.
Al añadir el método "toLowerCase", no importa si el usuario escribe el nombre del producto en minúscula o mayúscula, se mostrará el
producto del cual se haya buscado el nombre.
 */


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDENAR_PRECIO_ASC, resultObj.data); //Si todo está bien, se muestran los productos en orden ascendente
        }
    });
    

    document.getElementById("sortAsc").addEventListener("click", function(){ //Funciones que se llevan a cabo al hacer click en el botón correspondiente
        sortAndShowCategories(ORDENAR_PRECIO_ASC);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDENAR_PRECIO_DESC);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDENAR_POR_RELEV);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        //Para limpiar los campos donde se ingresa el precio, se asigna a éstos un string vacío, permitiendo ver nuevamente el placeholder
        document.getElementById("rangeFilterCountMax").value = "";

        costoMin = undefined;
        costoMax = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        costoMin = document.getElementById("rangeFilterCountMin").value;
        costoMax = document.getElementById("rangeFilterCountMax").value;

        if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0){
            costoMin = parseInt(costoMin);
        }
        else{
            costoMin = undefined;
        }

        if ((costoMax != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0){
            costoMax = parseInt(costoMax);
        }
        else{
            costoMax = undefined;
        }

        showCategoriesList();
    });
});

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    
    const filteredStrings = currentCategoriesArray.filter( producto => {
        return producto.name.toLowerCase().includes(searchString);
    });
    
    showCategoriesList(filteredStrings);
});