



var urlCampeones = "http://ddragon.leagueoflegends.com/cdn/12.12.1/data/en_US/champion.json";
var campeonesJSON;

var divContenedor = document.getElementById("contenedor");



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

        var img = document.createElement("img");
        img.src = "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/" + array[i].id + ".png";
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