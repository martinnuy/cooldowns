var version;

/*Guarda la version actualizada en una variable.*/
$.ajax({
    url: "https://ddragon.leagueoflegends.com/api/versions.json",
    async: false,
    dataType: 'json',
    success: function(data) {
      version = data[0];
    },
    error: function(jqxhr, textStatus, error) {
      console.error('Hubo un error:', textStatus, error);
    }
  });

const myModal = document.getElementById('exampleModal');
var urlCampeones = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/data/en_US/champion.json";
var urlHechizos = "http://ddragon.leagueoflegends.com/cdn/"+version+"/data/en_US/summoner.json";
var campeonesJSON;

var divContenedor = document.getElementById("contenedor");




var campeonesSeleccionados = 0;



function actualizarCuentaRegresiva() {
    var parrafos = document.querySelectorAll(".cuentaRegresiva");
    
    parrafos.forEach(function(parrafo) {
      var segundos = parseInt(parrafo.getAttribute("data-segundos"));
      
      if (segundos > 0) {
        segundos--;
        parrafo.setAttribute("data-segundos", segundos);
        parrafo.textContent = segundos;
      } else {
        parrafo.parentNode.children[0].style.filter = "brightness( 1 )";
        parrafo.parentNode.removeChild(parrafo); // Remover el párrafo cuando segundos llega a cero
      }
    });
  }
  
  setInterval(actualizarCuentaRegresiva, 1000); // Ejecutar la función cada 1 segundo


function mostrarCooldown( idElemento, cooldown ){

    
    if ( ! (document.getElementById(idElemento).children[1]) ) {
        var cooldownParrafo = document.createElement('p');
        cooldownParrafo.innerHTML = cooldown;
        cooldownParrafo.style.color = 'white';
        cooldownParrafo.className = 'cuentaRegresiva position-absolute top-50 start-50 translate-middle';
        cooldownParrafo.setAttribute("data-segundos", cooldown);
        
        document.getElementById(idElemento).append(cooldownParrafo);
        document.getElementById(idElemento).children[0].style.filter = "brightness( 0.4 )";
    }else{
        document.getElementById(idElemento).children[1].parentNode.children[0].style.filter = "brightness( 1 )";
        document.getElementById(idElemento).children[1].remove();
    }



}


function seleccionarHechizos(idElemento){

    var padre = document.getElementById(idElemento).parentNode;
    var contador = 0;

    for(i=0; i < padre.children.length; i++){
        if(padre.children[i].getAttribute("data-seleccionado") == 'true'){
            contador++;
        }
    }
    
     if ( document.getElementById(idElemento).getAttribute("data-seleccionado") == 'false' && contador < 2 ) {
        document.getElementById(idElemento).setAttribute( "data-seleccionado", true );
        document.getElementById(idElemento).style.filter = "brightness( 0.4 )";
     }else{
        document.getElementById(idElemento).setAttribute( "data-seleccionado", false );
        document.getElementById(idElemento).style.filter = "brightness( 1 )";
        contador--;
     }
    
     //console.log(contador);

     if(contador == 1){

        for(var i = padre.children.length - 1; i >= 0; i--){
            
            if(padre.children[i].getAttribute("data-seleccionado") == 'false'){
                padre.children[i].remove();
            }else{
                padre.children[i].className = "col-6 col-md-6 p-0 position-relative mx-auto";
                padre.children[i].style.filter = "brightness( 1 )";
                padre.children[i].setAttribute('onclick', 'mostrarCooldown( "'+padre.children[i].id+'", '+ document.getElementById(padre.children[i].id).getAttribute('data-cooldown') +' )' );
                
            }
        }

     }

}


function agregarAlArreglo( idElemento, idContenedor ){


    var elemento = document.getElementById(idElemento);
    var contenedor = document.getElementById(idContenedor);
    var estaEnElArreglo = false;

    
    //Revisamos que no este repetido
    for(i=0; i< contenedor.children.length ; i++){
        if( (contenedor.children[i].id) == elemento.id + "copy" ){
            estaEnElArreglo = true;
        }
    }


    //Se agrega al contenedor
    if (campeonesSeleccionados < 5 && !estaEnElArreglo) {

        
        var contenidoDeElemento = elemento.innerHTML;
        var divConHechizos = document.getElementById("hechizos").innerHTML;
        var divRow = document.createElement("div");
        divRow.className = "container";
        divRow.innerHTML = divConHechizos;


        for(i = 0; i < document.getElementById('hechizos').children[0].children.length; i++){
            
            divRow.children[0].children[i].id = idElemento + "h" +i;
            divRow.children[0].children[i].setAttribute('onclick', 'seleccionarHechizos("'+ divRow.children[0].children[i].id +'")' );
            //'mostrarCooldown( "'+idElemento + "h" +i+'" , '+divRow.children[0].children[i].getAttribute("data-cooldown")+' )'

        }


        var elementoCopia = document.createElement("div");
        elementoCopia.innerHTML = contenidoDeElemento;
        elementoCopia.className = "container col-12 col-md-2 p-3 changeSize m-auto";
        elementoCopia.id = elemento.id + "copy"
        elementoCopia.children[0].addEventListener('click', function(){elementoCopia.remove(); campeonesSeleccionados--;});
        elementoCopia.append(divRow);
        elementoCopia.setAttribute("data-aos" ,"fade");
        elementoCopia.setAttribute("data-aos-duration","2600");
        
        contenedor.append(elementoCopia);
        campeonesSeleccionados++;



    }else if(estaEnElArreglo){

        document.getElementById(idElemento + "copy").remove();
        campeonesSeleccionados--;


    }

}

function mostrarModal(){
    $("#exampleModal").modal('show');
}


//Trae la lista de campeones.
$.getJSON(urlCampeones, function(data) {
    // JSON result in `data` variable

    var array = Object.values(data["data"]);

    var fila = document.createElement("div");
        fila.className = "row";
        var idRow = 0;
        fila.setAttribute("id", "i" + idRow);

    for(let i = 0; i < array.length; i++){

        var columna = document.createElement("div");
        columna.setAttribute("id", "campeon"+i);
        columna.className = "col-3 col-sm-2 col-md-1 p-0 shadow-lg";
        columna.setAttribute('onclick', 'agregarAlArreglo( "campeon'+i+'", "divSeleccionados")' );
        columna.setAttribute("data-aos" ,"fade");
        columna.setAttribute("data-aos-duration","2600");

        var img = document.createElement("img");
        img.src = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/img/champion/" + array[i].id + ".png";
        img.className = "img-fluid zoom p-0 m-0 "

        columna.append(img);

        
        fila.append(columna);

        
    }
    
    contenedor.append(fila);
});




//Trae la lista de hechizos.
$.getJSON(urlHechizos, function(data) {
    // JSON result in `data` variable

    var array = Object.values(data["data"]);

    var fila = document.createElement("div");
        fila.className = "row mt-2";
        var idRow = 1;
        //fila.setAttribute("id", "i" + idRow);

    for(let i = 0; i < array.length; i++){

        if (i != 2 && i != 3 && i!= 10 && i!= 11 && i!= 13 && i!= 16 && i!= 17) {
            

            var columna = document.createElement("div");
            columna.setAttribute("id", "h"+i);
            columna.className = "col-4 col-md-4 col-lg-3 p-0 position-relative mx-auto";
            columna.setAttribute( "data-cooldown", array[i].cooldown[0] );
            columna.setAttribute( "data-seleccionado", false );

            var img = document.createElement("img");
            img.src = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/img/spell/" + array[i].id + ".png";
            img.className = "img-fluid brightnes rounded-3 p-1 m-0 "
            

            columna.append(img);

            
            fila.append(columna);


        }

        
    }
    
    hechizos.append(fila);
    
});



$(document).ready(function() {
    var pantallaCarga = $("#pantalla-carga");
  
    // Mostrar pantalla de carga al principio.
    pantallaCarga.fadeIn();
  
    // Temporizador para ocultar la pantalla de carga.
    setTimeout(function() {
      pantallaCarga.fadeOut();
      
      //Muestra el modal de instrucciones.
      mostrarModal();

    }, 2600); 
  });
