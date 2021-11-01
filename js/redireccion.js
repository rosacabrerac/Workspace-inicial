function redireccion() {
    if (localStorage.getItem("nombre") === null) {
      window.location.href = "index.html";
    }
    
  }
  redireccion();
/*Para llevar a cabo la redirección por si un usuario ha ingresado a través de la página de log in, la idea es que se compruebe si hay 
algún dato guardado en el local storage, de no ser así, se redirecciona a la persona al index (página para "loguearse") */



document.addEventListener("DOMContentLoaded", function (e) {
    function saludo() {
      let bienvenida = document.getElementById("mostrarNombre");
      let name = localStorage.getItem("nombre");
  
        bienvenida.innerHTML = `Hola, ` + name + `!`;
    }
    saludo();


    const salir = document.getElementById("logOut");
    salir.onclick = function() {
      
      localStorage.removeItem("nombre");
      localStorage.removeItem("email");
      redireccion();
    };

  });

/*Para que aparezca el nombre de la persona que inició sesión en todas las páginas, se inserta usando innnerHTML el nombre del usuario
"trayendolo" del local storage con el método "getItem" */
  
  
 