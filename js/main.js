


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


var urlCampeones = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/data/en_US/champion.json";
var campeonesJSON;

var divContenedor = document.getElementById("contenedor");




var campeonesSeleccionados = 0;




function agregarAlArreglo( idElemento, idContenedor ){


    var elemento = document.getElementById(idElemento);
    var contenedor = document.getElementById(idContenedor);
    var estaEnElArreglo = false;

    console.log(idElemento);
    //Revisamos que no este repetido
    for(i=0; i< contenedor.children.length ; i++){
        if( (contenedor.children[i].id) == elemento.id + "copy" ){
            estaEnElArreglo = true;
        }
    }


    //Se agrega al contenedor
    if (campeonesSeleccionados < 5 && !estaEnElArreglo) {
        
        var contenidoDeElemento = elemento.innerHTML;

        var elementoCopia = document.createElement("div");
        elementoCopia.innerHTML = contenidoDeElemento;
        elementoCopia.className = "col-2 p-0 m-auto";
        elementoCopia.id = elemento.id + "copy"
        elementoCopia.addEventListener('click', function(){elementoCopia.remove(); campeonesSeleccionados--;});
        
        contenedor.append(elementoCopia);
        campeonesSeleccionados++;

    }else if(estaEnElArreglo){

        document.getElementById(idElemento + "copy").remove();
        campeonesSeleccionados--;


    }

}




$.getJSON(urlCampeones, function(data) {
    // JSON result in `data` variable

    var array = Object.values(data["data"]);

    var fila = document.createElement("div");
        fila.className = "row";
        var idRow = 0;
        fila.setAttribute("id", "i" + idRow);

    for(let i = 0; i < array.length; i++){

        var columna = document.createElement("div");
        columna.setAttribute("id", "j"+i);
        columna.className = "col-1 p-0";
        columna.setAttribute('onclick', 'agregarAlArreglo( "j'+i+'", "divSeleccionados")' );
        

        var img = document.createElement("img");
        img.src = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/img/champion/" + array[i].id + ".png";
        img.className = "img-fluid zoom p-0 m-0 "

        columna.append(img);

        
        fila.append(columna);

        
    }
    
    contenedor.append(fila);
});





/*function imprimir ( contenedor, cantidad ){

    for (let i = 0; i < cantidad; i++) {

        var fila = document.createElement("div");
        fila.className = "row";
        fila.setAttribute("id", "i"+i);
        
        contenedor.append(fila);

        for(let j = 0; j < 12; j++){

            var columna = document.createElement("h3");
            columna.innerHTML = "A";
            columna.setAttribute("id", "j"+j);
            columna.className = "col";
                
            fila.append(columna);
        }

        
    }

}


imprimir( divContenedor, 5 );*/ 