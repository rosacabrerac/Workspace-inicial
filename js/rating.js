var rating = [];

function showRating(score){

    
    /*for(let i = 0; i < array.length; i++){ 
        let comm = array[i];*/

        if(!score) { // Si el número de estrellas es 0, retorna un div vacío
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
//};

/* En la comparación de estrellas, el ? significa return, : significa else  */

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(commObj){
        if (commObj.status === "ok")
        {
            rating = commObj.data;

            showRating(rating);
        }
    });
});