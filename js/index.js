



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }

      
      const boton = document.getElementById("btnSubmit");
      
      boton.onclick = function () {
        const name = document.getElementById("nombre").value;
        
        if(name != "") {
      
          localStorage.setItem("nombre", name);
        
        }
      };
});

/*Para guardar datos (en este caso el nombre del usuario) en el local storage, utilicé el botón de Ingresar.
Primero "referencié" al botón de Ingresar y le asigné a la constante "boton", luego hice lo mismo con el valor que ingrese el
usuario para su nombre y se lo asigné a la contante llamada "name".
Cuando el boton es clickeado, se añade el valor de "name" al local storage con la key "nombre" *SI* lo que fue ingresado
en el campo de "nombre" no es un string vacío. Lamentablemente como un espacio " " es conciderado un string,
básicamente se puede ingresar cualquier caracter y se guardará en local storage. Aún no sé cómo evitar esto porque no sé
cómo buscarlo x_x */